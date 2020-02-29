import Sequelize, { Model } from 'sequelize';

class Pedido extends Model{

    static init(sequelize){
       super.init({
        preco: Sequelize.FLOAT, 
        pedido_ativo: Sequelize.BOOLEAN
       },{
           sequelize
       });
       return this;
    }

    static associate(models){
        this.belongsTo(models.User,{
            foreingkey: 'user_id',
            as: 'user',
        });
        this.belongsToMany(models.Pizza,{
            foreingKey: 'pizzas_id',
            as: 'pizzas',
        });
        this.belongsToMany(models.Bebida,{
            foreingKey: 'bebidas_id',
            as: 'bebidas',
        });

    }

}

export default Pedido;