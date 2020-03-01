import Sequelize, { Model } from 'sequelize';

class Bebida extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                preco: Sequelize.FLOAT,
                quantidade: Sequelize.INTEGER,
                
            },
            {
                sequelize,
            }
            
        );
    }
}

export default Bebida;