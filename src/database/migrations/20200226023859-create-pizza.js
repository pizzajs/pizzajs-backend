'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
      return queryInterface.createTable('pizzas', { 
        id:{
          type: Sequelize.INTEGER 
         },
        sabor:{
          type: Sequelize.STRING,
        },
    
        ingredientes_padrao: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
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
        // ingredientes_extra: {
  
        // }'
      });
    },

  down: queryInterface => {

      return queryInterface.dropTable('pizzas');

  }
};
