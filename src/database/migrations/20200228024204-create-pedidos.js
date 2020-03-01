'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('pedidos', { 
        id: {
          type: Sequelize.INTEGER, 
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        preco: {
          type: Sequelize.FLOAT, 
          allowNull: false,
          defaultValue: '0.0',
        },
        pedido_ativo: {
          type: Sequelize.BOOLEAN, 
          defaultValue: false,
        },
        created_at:{
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at:{
          type: Sequelize.DATE,
          allowNull: false,
        },
        user_id:{
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id', 
         },
        },
        bebidas_id: {
          type: Sequelize.ARRAY({
            type:Sequelize.INTEGER,
            references: {
              model: 'bebidas', 
              key: 'id', 
            },
          })
          
        },
        pizzas_id: {
          type: Sequelize.ARRAY({
            type: Sequelize.INTEGER,
              references: {
              model: 'pizzas', 
              key: 'id', 
            },
          }),
          
        },
      });

  },
  

  down: (queryInterface) => {
      return queryInterface.dropTable('pedidos');
  
  }
};
