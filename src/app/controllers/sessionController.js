import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import User from '../models/user';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            senha: Yup.string().min(8).required(),
            email: Yup.string().email()
            .required(),
            
        });

        if (!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'os campos inseridos não são validos'});
        }
        
        const {email, senha} = req.body;


        const user = await User.findOne({ where: { email }});

        if(!user) {
            return res.status(401).json({ error: 'Usuário não encontrado'});

        }

        if (!(await user.checkSenha(senha))) {
            return res.status(401).json({ error: 'senha incorreta'});
        }

        const {id, nome } = user;

        return res.json({
            user: {
                id,
                nome,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret,{
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();