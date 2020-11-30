'use strict';

const { v4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [
      {
        id: v4(),
        category: "Food/Drinks",
      },
      {
        id: v4(),
        category: "Shopping",
      },
      {
        id: v4(),
        category: "Transportation",
      },
      {
        id: v4(),
        category: "Entertainment",
      },
      {
        id: v4(),
        category: "Family",
      },
      {
        id: v4(),
        category: "Health/Sport",
      },
      {
        id: v4(),
        category: "Pets",
      },
      {
        id: v4(),
        category: "Travels",
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', {})
  }
};
