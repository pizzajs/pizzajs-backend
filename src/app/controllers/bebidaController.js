import Bebida from '../models/bebida';

class BebidaController {
    async store(req, res){
        const bebida = await Bebida.create(req.body);
        return res.json(bebida);
    }

}

export default new BebidaController();