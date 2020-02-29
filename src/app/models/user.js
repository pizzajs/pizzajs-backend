import Sequelize, { Model } from 'sequelize';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                senha_hash: Sequelize.STRING,
                email: Sequelize.STRING,
                telefone: Sequelize.STRING,
                admin: Sequelize.BOOLEAN,
                endereco: Sequelize.STRING,
            },
            {
                sequelize,
            }
            
        );
    }
}

export default User;