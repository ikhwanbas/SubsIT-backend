'use strict';

const { v4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('subscriptions', [

      {

        id: "123",
        repeat: "monthly",
        service_id: "123",
        user_id: "1981bab4-2479-4085-afb4-67afb51e27e9",
        card_id: "123",
        created_at: new Date(),
        start_date: new Date(),
        due_date: new Date(),
        cost: 30000,
        payment: 30000
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('subscriptions', {})
  }
};
