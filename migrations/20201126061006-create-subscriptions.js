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
      startDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
<<<<<<< HEAD
=======
      payment: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
>>>>>>> 0212e3f26e4eeff7cd14f915edd65b0d692071d3
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        }
      },
      serviceId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "services",
          key: "id"
        }
      },
      cardId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "cards",
          key: "id"
        },
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('subscriptions');
  }
};