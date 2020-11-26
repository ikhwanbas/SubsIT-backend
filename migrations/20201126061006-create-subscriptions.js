'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subscriptions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      repeat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      due_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      cost: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      payment: {
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
      },
      service_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "services",
          key: "id"
        }
      },
      card_id: {
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
    await queryInterface.dropTable('subscriptions');
  }
};