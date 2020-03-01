import Sequelize, { Model } from 'sequelize';

class Pedido extends Model{

    static init(sequelize){
       super.init({
        preco: Sequelize.FLOAT, 
        pedido_ativo: Sequelize.BOOLEAN,
        user_id: Sequelize.INTEGER,
        bebidas_id: Sequelize.ARRAY(Sequelize.INTEGER),
        pizzas_id: Sequelize.ARRAY(Sequelize.INTEGER),
       },{
           sequelize,
       });
       return this;
    }

    static associate(models){
        Pedido.belongsTo(models.User,{
            foreingkey: 'user_id',
            as: 'user',
        });
        
        Pedido.belongsToMany(models.Bebida,{
            foreingKey: 'bebidas_id',
            as: 'bebidas',
        });

        Pedido.belongsToMany(models.Pizza,{
            foreingKey: 'pizzas_id',
            as: 'pizzas',
        });

    }

}

export default Pedido;