'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('cards', [

      {

        id: "123",
        card_type: "visa",
        card_name: "rinnibank",
        card_number: 12121,
        card_valid: "12/12",
        saldo: 500000,
        user_id: "1981bab4-2479-4085-afb4-67afb51e27e9"
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cards', {})

  }
};
