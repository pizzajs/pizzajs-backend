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
          defaultValeu: '0.0',
        },
        pedido_ativo: {
          type: Sequelize.BOOLEAN, 
          defaultValeu: false,
        },
        created_at:{
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at:{
          type: Sequelize.DATE,
          allowNull: false,
        },
       /* produtos: {

        },
        bebidas: {

        },
        id_user: {
          
        },*/
      });

  },

  down: (queryInterface) => {
      return queryInterface.dropTable('pedidos');
  
  }
};
