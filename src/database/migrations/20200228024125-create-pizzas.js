'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
      return queryInterface.createTable('pizzas', { 
        id:{
          type: Sequelize.INTEGER, 
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
         },
        sabor:{
          type: Sequelize.STRING,
        },
    
        ingredientes_padrao: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: false,
        },
        preco: {
          type: Sequelize.FLOAT, 
          allowNull: false,
          defaultValue: '0.0',
        },
        created_at:{
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at:{
          type: Sequelize.DATE,
          allowNull: false,
        },
        ingredientes_extra_id: {
          type: Sequelize.ARRAY({
            type:Sequelize.INTEGER,
            references: {
              model: 'ingredientes', 
              key: 'id', 
            },
          })
        },
      });
    },

  down: queryInterface => {

      return queryInterface.dropTable('pizzas');

  }
};
