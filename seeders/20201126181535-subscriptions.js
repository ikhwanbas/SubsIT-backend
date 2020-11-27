'use strict';

const { v4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('subscriptions', [

      {

        id: v4(),
        repeat: "monthly",
        service_id: "123",
        user_id: "9e8b38b5-36a9-4446-b614-0d57f92fec76",
        card_id: "48b793d0-8e22-4140-abca-368f8090503b",
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
