import { Router } from 'express';
import User from './app/models/user';
import Pedido from './app/models/pedidos';

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
        preco: 34,
        pedido_ativo:true,
    })
    
    return res.json(pedido);
})

export default routes;