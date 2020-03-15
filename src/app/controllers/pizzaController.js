import * as Yup from 'yup';

import Pizza from '../models/pizza';
import Pedido from '../models/pedidos';

class PizzaController {
    async store(req, res){
        const schema = Yup.object().shape({
            sabor: Yup.string()
            .required(),
            preco: Yup.number()
            .required(),
            ingredientes_padrao: Yup.array().of(Yup.string())
            .required(),
            ingredientes_extra_id: Yup.array().of(Yup.number().integer()),   
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'os campos inseridos não são validos'})
        }

        const pizza = await Pizza.create(req.body);
        
        return res.json(pizza.id);
    }
    
    async update(req, res){
        const {pedidoId, pizzaId} = req.params;

        const schema = Yup.object().shape({
            sabor: Yup.string(),
            preco: Yup.number(),
            ingredientes_padrao: Yup.array.of(Yup.integer()),
            ingredientes_extra_id: Yup.array.of(Yup.integer()),   
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'os campos inseridos não são validos'})
        }

        const pedido = await Pedido.findOne( {where: {id: pedidoId}});

        if(!pedido){
            return res.status(401).json({erro: "pedido não encontrado"});    
        }
        
        let pizza = await Pizza.findByPk(pizzaId);

        if(!pizza){
            return res.status(401).json({erro: "pizza não encontrada"});    
        }
        
        if(pedido.user_id !== req.userId){
            return res.status(401).json({erro: "Este usuário não pode editar esse pedido"});
        }

        // se o usuário for admin ele pula o if

        await pizza.update(req.body);
        return res.json(pizza);
    }

    async index(req, res) {

        const pizzas = await Pizza.findAll({attributes:[
            'id',
            'sabor',
            'preco',
            'ingredientes_padrao',
            'ingredientes_extra_id',
            ],
        });

        return res.json(pizzas);
    }
}

export default new PizzaController();