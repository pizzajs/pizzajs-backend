import Bebida from '../models/bebida';
import * as Yup from 'yup';
import User from '../models/user';

class BebidaController {
    async store(req, res){

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            preco: Yup.number().required(),
            quantidade: Yup.number().integer().required(),
        });

        if(!await schema.isValid(req.body)){
            return res.status(401).json({error: 'os campos inseridos não são validos'});
        }
        const userId = req.userId;

        const user = await User.findOne({where: {id: userId}});
        
        // se o usuário for admin ele pula o if
        if(user && !(user.admin === true)){
            return res.status(401).json({erro: "usuário não encontrado ou não tem permissão!"});
        }

        const bebida = await Bebida.create(req.body);
        return res.json(bebida);
    }
    async update(req, res){
        const userId = req.userId;
        const bebidaId = req.params.id; 

        const schema = Yup.object().shape({
            nome: Yup.string(),
            preco: Yup.number(),
            quantidade: Yup.number().integer(),
        });

        if(!await schema.isValid(req.body)){
            return res.status(401).json({error: 'os campos inseridos não são validos'});
        }

        const user = await User.findOne({where: {id: userId}});
        let bebida = await Bebida.findByPk(bebidaId);

        // se o usuário for admin ele pula o if
        if(user && !(user.admin === true)){
            return res.status(401).json({erro: "usuário não encontrado ou não tem permissão!"});
        }

        await bebida.update(req.body);
        return res.json(bebida);
    }
}

export default new BebidaController();