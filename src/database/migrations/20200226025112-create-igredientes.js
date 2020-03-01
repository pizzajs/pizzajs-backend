'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('ingredientes', { 
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
        preco: {
          type: Sequelize.FLOAT, 
          allowNull: false,
          defaultValue: '0.0',
        },
        quantidade:{
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: '0',
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
    
      return queryInterface.dropTable('ingredientes');
  }
};
