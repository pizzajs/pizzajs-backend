import Sequelize, { Model } from 'sequelize';

class Pedidos extends Model{

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
        this.belonsToMany(models.Pizza,{
            foreingKey: ''
        })
    }

}

export default Pedidos;