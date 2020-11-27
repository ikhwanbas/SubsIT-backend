'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('expenses', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      purchaseDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      total: {
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
      },
      cardId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "cards",
          key: "id"
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('expenses');
  }
};