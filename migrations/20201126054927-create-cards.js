'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cards', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      cardHolder: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cardType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cardBank: {
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
      cvv: {
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