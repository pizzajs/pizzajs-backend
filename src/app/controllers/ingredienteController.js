import Ingrediente from '../models/ingrediente';

class IngredienteController {
    async store(req, res){
        const ingrediente = await Ingrediente.create(req.body);
        return res.json(ingrediente);
    }

}

export default new IngredienteController();