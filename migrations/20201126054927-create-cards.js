'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cards', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      cardType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cardName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cardNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cardValid: {
        type: Sequelize.STRING,
        allowNull: false
      },
      saldo: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cards');
  }
};