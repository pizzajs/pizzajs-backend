import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth'

export default  (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({error: 'Token não encontrado'});
    }

    const[,token] = authHeader.split(' ');

    try{
        
        console.log(token);
        console.log(authHeader);

        const decoded = jwt.verify(token, authConfig.secret);
        console.log(decoded)    
        // req.userId = decoded.id;
        return next();
    }catch (err){
        return res.status(401).json({error: 'Usuário não encontrado'});
    }
};