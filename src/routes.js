import { Router } from 'express';
import User from './app/models/user';
import Pedido from './app/models/pedidos';
import Bebida from './app/models/bebida';


const routes = new Router();

routes.get('/', async (req, res) => {
    const user = await User.create({
        nome: 'João',
        email:'Joao@pedefeijao.com ',
        senha_hash:'jp123',
        telefone:'40028922', 
        admin:true,
        endereco: 'orobó',
    })
    
    
    return res.json(user);
})

routes.get('/pizza', async (req, res) => {
    const pedido = await Pedido.create({
        preco: 100,
        pedido_ativo:true,
        user_id:1,
        bebidas_id: [1,2],
    })
    return res.json(pedido);
})

routes.get('/bebida', async (req, res) => {
    const bebida = await Bebida.create({
        nome: 'guarana',
        preco: 100.0,
        quantidade: 1,
    })
    return res.json(bebida);
})

routes.get('/list', async (req, res) => {
    const pedido = await Pedido.findAll();
    
    return res.json(pedido);
})

export default routes;