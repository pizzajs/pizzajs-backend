import Pedido from '../models/pedidos';

class PedidoController {
    async store(req, res){
        const pedido = await Pedido.create(req.body);
        return res.json(pedido);
    }

}

export default new PedidoController();