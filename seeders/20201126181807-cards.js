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
        saldo: 200000,
        userId: "14fb2069-2dd9-4951-9a74-218f270156bd"
      },
      {
        id: v4(),
        cardType: "visa",
        cardName: "rinnibank",
        cardNumber: 12121,
        cardValid: "12/12",
        saldo: 300000,
        userId: "62f9f4ff-2682-490a-bfbd-79c5b65f701e"
      },
      {
        id: v4(),
        cardType: "visa",
        cardName: "rinnibank",
        cardNumber: 12121,
        cardValid: "12/12",
        saldo: 400000,
        userId: "7eb89c96-f705-4101-960f-9f6d9cf82c6e"
      },
      {
        id: v4(),
        cardType: "visa",
        cardName: "rinnibank",
        cardNumber: 12121,
        cardValid: "12/12",
        saldo: 400000,
        userId: "88167c92-280f-4d55-b983-cda90d614904"
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cards', {})

  }
};
