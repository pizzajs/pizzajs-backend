import Pizza from '../models/pizza';
import Pedido from '../models/pedidos';

class PizzaController {
    async store(req, res){
        // const {pedidoId} = req.params;

        // let pedido = Pedido.findOne(pedidoId);

        // if(!pedido){
        //     return res.status(401).json({erro: "pedido não encontrado"});    
        // }

        //fazer verificação dos se os ingredientes extras existem
        const pizza = await Pizza.create(req.body);
        
        return res.json(pizza.id);
    }
    
    async update(req, res){
        const {pedidoId, pizzaId} = req.params;

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
}

export default new PizzaController();