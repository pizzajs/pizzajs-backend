import * as Yup from 'yup';
import Pedido from '../models/pedidos';
import User from '../models/user';

class PedidoController {

    async store(req, res){
        const schema = Yup.object().shape({
            preco: Yup.number().required(), 
            pedido_ativo: Yup.boolean().required(),
            bebidas_id: Yup.array().of(Yup.number().integer()),
            pizzas_id: Yup.array().of(Yup.number().integer()),
        });

        if (!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'os campos inseridos não são validos'});
        }
        // acha o usuario com o id da sessao
        const user = User.findOne({where: {id: req.userId}});

        
        if(!user){
            //conferir se o usuario existe
            return res.status(401).json({erro: "usuário não encontrado."});
        }

        // colocando o id do usuario na tabela de pedidos
        req.body.user_id = req.userId
        
        const pedido = await Pedido.create(req.body);

        return res.json(pedido);
    }

    async update(req, res){
        const pedidoId = req.params.id

        let pedido = await Pedido.findByPk(pedidoId);

        if(!pedido){
            return res.status(401).json({erro: "pedido não encontrado."});
        }

        if(!pedido.pedido_ativo){
            return res.status(401).json({erro: "O pedido não está ativo"});
        }

        if(pedido.user_id !== req.userId){
            return res.status(401).json({erro: "Este usuário não pode editar esse pedido"});
        }
        
        await pedido.update(req.body);
    
        return res.json(pedido);
    }
    async index(req, res){
        const id_pedido = req.params.pedidoId;
        if(id_pedido){
            const pedidos_do_usuario = await Pedido.findOne({where:{id: id_pedido}, 
                attributes:[
                    'preco', 
                    'pedido_ativo',
                    'user_id',
                    'bebidas_id',
                    'pizzas_id',
                ] 
            });
            return res.json(pedidos_do_usuario);
        }
        const userId = req.userId;
         //Listar todos o pedidos do cliente
         const todos_pedidos_cliente = await Pedido.findAll({
             where:{
                    user_id: userId
                },
                attributes:[
                    'preco', 
                    'pedido_ativo',
                    'user_id',
                    'bebidas_id',
                    'pizzas_id',],
            })

        return res.json(todos_pedidos_cliente);
    }
    async cancelar(req, res){
        const userId = req.userId;
        const user = await User.findOne({where:{id:userId}});
        
        if(!user){
            return res.status(401).json({erro: 'usuário não encontrado'});
        }

        const pedidoId = req.params.pedidoId;
        let pedido = await Pedido.findByPk(pedidoId);
        console.log(pedido)
        if(pedido && !(pedido.pedido_ativo==true)){
            return res.json({erro: 'Pedido não existe ou está inativo'})
        }
        
        await pedido.update({pedido_ativo: false});
        return res.json({mensagem: 'pedido cancelado com sucesso'});

    }
}

export default new PedidoController();