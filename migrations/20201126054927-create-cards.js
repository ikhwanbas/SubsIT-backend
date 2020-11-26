'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cards', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      card_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      card_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      card_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      card_valid: {
        type: Sequelize.STRING,
        allowNull: false
      },
      saldo: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      user_id: {
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