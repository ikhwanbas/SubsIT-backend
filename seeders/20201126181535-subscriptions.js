'use strict';

const { v4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('subscriptions', [

      {

        id: v4(),
        repeat: "monthly",
        serviceId: "4899dac9-0654-4a0e-a79b-aecfd913103b",
        userId: "ffd6a16b-2dd9-4d85-993d-082586f44d6f",
        cardId: "3e1aeccb-de11-4ad4-845f-67ae4392bc9a",
        startDate: new Date(),
        dueDate: new Date(),
        payment: 30000
      },
      {
        id: v4(),
        repeat: "monthly",
        serviceId: "4899dac9-0654-4a0e-a79b-aecfd913103b",
        userId: "c4e13bfa-8a16-4292-b24b-4768290613d9",
        cardId: "3ad7c1bc-e870-40b4-b055-72cc9ef99b9a",
        startDate: new Date(),
        dueDate: new Date(),
        payment: 30000
      },
      {
        id: v4(),
        repeat: "monthly",
        serviceId: "4899dac9-0654-4a0e-a79b-aecfd913103b",
        userId: "a11d2ba8-68d0-42fb-b027-0e9be0c46528",
        cardId: "8c99881b-58ae-4266-b2ed-c65cbd37aa26",
        startDate: new Date(),
        dueDate: new Date(),
        payment: 30000
      },
      {
        id: v4(),
        repeat: "monthly",
        serviceId: "4899dac9-0654-4a0e-a79b-aecfd913103b",
        userId: "ce15b275-8e71-4530-9188-12217cab9a81",
        cardId: "e6046395-333b-4825-9bb0-52083cd8559e",
        startDate: new Date(),
        dueDate: new Date(),
        payment: 30000
      }

    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('subscriptions', {})
  }
};
