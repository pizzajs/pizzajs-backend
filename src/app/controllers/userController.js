import User from '../models/user';

class UserController {
    async store(req, res) {
        const userExists = await User.findOne({ where: {email: req.body.email }});

        if(userExists){
            return res.status(400).json({ error: 'Usuário já existente'})
        }

        const user = await User.create(req.body);

        return res.json(user);
    }
    async update(req, res) {
        res.json(req.UserId);
    }
}
export default new UserController();