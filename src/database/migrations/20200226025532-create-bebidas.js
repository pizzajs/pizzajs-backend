'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('bebidas', { 
        id:{
          type: Sequelize.INTEGER, 
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
            
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        quantidade:{
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValeu: '0',
        },
        preco: {
          type: Sequelize.FLOAT, 
          allowNull: false,
          defaultValeu: '0.0',
        },
        created_at:{
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at:{
          type: Sequelize.DATE,
          allowNull: false,
        }, 
      });
    
  },

  down: (queryInterface) => {
    
      return queryInterface.dropTable('bebidas');
  }
};
