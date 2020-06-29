import * as Yup from 'yup';

import Ingrediente from '../models/ingrediente';
import User from '../models/user';

class IngredienteController {
    async store(req, res){
        const schema = Yup.object().shape({
            nome: Yup.string()
            .required(),
            tipo: Yup.string().length(1),
            preco: Yup.number()
            .required(),
            quantidade: Yup.number()
            .integer(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'os campos inseridos não são validos'})
        }        
        const userId = req.userId;

        const user = await User.findOne({where: {id: userId}});
        
        // se o usuário for admin ele pula o if
        if(user && !(user.admin === true)){
            return res.status(401).json({erro: "usuário não encontrado ou não tem permissão!"});
        }

        req.body.tipo = req.body.tipo.toUpperCase();
        const ingrediente = await Ingrediente.create(req.body);
        return res.json(ingrediente);
    }

    async update(req, res){
        const schema = Yup.object().shape({
            nome: Yup.string(),
            tipo: Yup.string().length(1),
            preco: Yup.number(),
            quantidade: Yup.number()
            .integer(),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'os campos inseridos não são validos'})
        }
        const userId = req.userId;
        const ingredienteId = req.params.id; 

        const user = await User.findOne({where: {id: userId}});
        const ingrediente = await Ingrediente.findByPk(ingredienteId);

        // se o usuário for admin ele pula o if
        if(user && !(user.admin === true)){
            return res.status(401).json({erro: "usuário não encontrado ou não tem permissão!"});
        }

        await ingrediente.update(req.body);
        return res.json(ingrediente);
    }

    async index(req, res) {

        const ingredientes = await Ingrediente.findAll({attributes:[
            'id',
            'nome',
            'tipo',
            'preco',
            'quantidade',
            ],
        });

        return res.json(ingredientes);
    }

    async delete(req, res){
        const userId = req.userId;
        const user = await User.findOne({where:{id: userId}});

        if(user && !(user.admin==true)){
            return res.status(401).json({erro: 'Usuário não tem permissão!'});
        }

        const ingredienteID = req.params.ingredienteId;
        const ingrediente = await Ingrediente.findOne({where:{id: ingredienteID}});

        if(!ingrediente){
            return res.json({erro: 'ingrediente não encontrada'});
        }

        try{
            await Ingrediente.destroy({where:{id:ingredienteID}});
            return res.json({mensagem: 'ingrediente apagado com sucesso!'});
        }catch(err){
            return res.status(400).json({erro:'não foi possivel deletar'});
        }
       
    }  
}

export default new IngredienteController();