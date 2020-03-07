import Bebida from '../models/bebida';
import User from '../models/user';

class BebidaController {
    async store(req, res){
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