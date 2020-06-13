import Sequelize, { Model } from 'sequelize';

class Ingrediente extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                preco: Sequelize.FLOAT,
                tipo: Sequelize.STRING(1),
                quantidade: Sequelize.INTEGER,
                
            },
            {
                sequelize,
            }
            
        );
    }
}

export default Ingrediente;