import * as Yup from 'yup';
import User from '../models/user';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
                nome: Yup.string().required(),
                email: Yup.string()
                .email()
                .required(),
                senha: Yup.string()
                .required()
                .min(8),
                endereco: Yup.string().required(),
                telefone: Yup.string().min(11).max(11).required(),
            });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'os campos inseridos não são validos'})
        }
        const userExists = await User.findOne({ where: {email: req.body.email }});

        if(userExists){
            return res.status(400).json({ error: 'Usuário já existente'})
        }

        const user = await User.create(req.body);
        return res.json(user);
    }
    
    async update(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string(),
            email: Yup.string()
            .email(),
            telefone: Yup.string()
            .min(11)
            .max(11),
            endereco: Yup.string(),
            senhaAntiga: Yup.string(),
            senha: Yup.string()
            .min(8)
            .when('senhaAntiga',(senhaAntiga, field) =>
                senhaAntiga ? field.required() : field
            ),
            confirmarSenha: Yup.string()
            .min(8)
            .when('senha',(senha, field) =>
                senha ? field.required().oneOff([Yup.ref('senha')]) : field
            ),
        });
        
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'os campos inseridos não são validos'})
        }
        
        const { email, senhaAntiga } = req.body;

        const user = await User.findByPk(req.userId);

        // findByPk esta buscando o id do usuario logado e coloca na constante user os dados do usuario.
        
        if(email !== user.email){
            // se diferente pode modificar o email
            const userExists = await User.findOne({where: { email }});
            if(userExists){
                return res.status(400).json({ error: 'Novo email não pode ser igual o antigo!'});
            }
        }

        // se a senha for verificada e não passar na verificação entra no if
        if(senhaAntiga && !(await user.checkSenha(senhaAntiga))) {
            
            return res.status(401).json({ error: 'senha antiga incorreta'});
        }
        const {id , nome, admin } = await user.update(req.body);
        
        return res.json({
            id,
            nome,
            email,
            admin,
        });
    }

    async index(req, res) {
        const userId = req.userId;
        const user = await User.findOne({where: {id: userId},attributes:['id',
            'nome',
            'email',
            'telefone',
            'endereco',
            'admin'
            ],
        });

        // se o usuário for admin ele pula o if
        if(user && !(user.admin === true)){

            return res.json(user);
        }

        const users = await User.findAll({attributes:[
            'id',
            'nome',
            'email',
            'telefone',
            'endereco',
            'admin',
            ],
        });

        return res.json(users);
    }
}

export default new UserController();