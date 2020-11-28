'use strict';

const { v4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('cards', [
      {
        id: v4(),
        cardType: "visa",
        cardName: "rinnibank",
        cardNumber: 12121,
        cardValid: "12/12",
        saldo: 150000,
        userId: "ffd6a16b-2dd9-4d85-993d-082586f44d6f"
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cards', {})

  }
};
