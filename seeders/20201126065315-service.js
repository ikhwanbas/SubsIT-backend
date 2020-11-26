'use strict';

const { v4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('services', [
      {
        id: v4(),
        name: "NETFLIX",
        description: "Netflix is the world’s leading streaming entertainment service with over 195 million paid memberships in over 190 countries enjoying TV series, documentaries and feature films across a wide variety of genres and languages. Members can watch as much as they want, anytime, anywhere, on any internet-connected screen. Members can play, pause and resume watching, all without commercials or commitments",
        picture: "https://cdn.vox-cdn.com/thumbor/lfpXTYMyJpDlMevYNh0PfJu3M6Q=/39x0:3111x2048/920x613/filters:focal(39x0:3111x2048):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/49901753/netflixlogo.0.0.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: v4(),
        name: "",
        description: "",
        picture: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: v4(),
        name: "",
        description: "",
        picture: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: v4(),
        name: "",
        description: "",
        picture: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: v4(),
        name: "",
        description: "",
        picture: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: v4(),
        name: "",
        description: "",
        picture: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: v4(),
        name: "",
        description: "",
        picture: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: v4(),
        name: "",
        description: "",
        picture: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: v4(),
        name: "",
        description: "",
        picture: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: v4(),
        name: "",
        description: "",
        picture: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: v4(),
        name: "",
        description: "",
        picture: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: v4(),
        name: "",
        description: "",
        picture: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: v4(),
        name: "",
        description: "",
        picture: "",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('services', {})
  }
};
