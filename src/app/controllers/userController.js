import User from '../models/user';

class UserController {
    async store(req, res) {
        const userExists = await User.findOne({ where: {email: req.body.email }});

        if(userExists){
            return res.status(400).json({ error: 'Usuário já existente'})
        }

        const user = await User.create(req.body);
        User.u

        return res.json(user);
    }
    
    async update(req, res) {
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
}

export default new UserController();