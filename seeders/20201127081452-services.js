'use strict';

const { v4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('services', [
      {
        id: "1970892d-2139-4228-9a9b-ed3d2d7db8a0",
        name: "NETFLIX",
        cost: 130000,
        description: "Netflix is the world’s leading streaming entertainment service with over 195 million paid memberships in over 190 countries enjoying TV series, documentaries and feature films across a wide variety of genres and languages. Members can watch as much as they want, anytime, anywhere, on any internet-connected screen. Members can play, pause and resume watching, all without commercials or commitments",
        picture: "https://cdn.vox-cdn.com/thumbor/lfpXTYMyJpDlMevYNh0PfJu3M6Q=/39x0:3111x2048/920x613/filters:focal(39x0:3111x2048):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/49901753/netflixlogo.0.0.png",
      },
      {
        id: "8a269180-2504-461d-8b64-5a2f6e1c4b30",
        name: "PRIME VIDEO",
        cost: 45000,
        description: "Watch movies and TV shows recommended for you, including Amazon Originals like The Boys, Hunters, The Marvelous Mrs. Maisel, Tom Clancy’s Jack Ryan, and much more",
        picture: "https://m.media-amazon.com/images/G/01/primevideo/seo/primevideo-seo-logo-square.png",
      },
      {
        id: "d675a05c-1caf-4194-9c94-5fc15146c675",
        name: "DISNEY PLUS",
        cost: 99000,
        description: "Disney+ is the exclusive home for your favorite movies and shows from Disney, Pixar, Marvel, Star Wars, and National Geographic.",
        picture: "https://lumiere-a.akamaihd.net/v1/images/2e3d33fc0eefc265131cc02158c1c69a_4096x2303_0d094a0f.png?region=1,0,4094,2303",
      },
      {
        id: "9176e84d-ccec-42b8-9f4c-8dafadf6c50c",
        name: "YOUTUBE PREMIUM",
        cost: 75000,
        description: "Ad-free unlimited music & videos. New users 1 month free. Terms apply. YouTube & YouTube Music Premium is ad-free, offline and in the background. Come on, register! YouTube is ad-free. Only one membership. Cancel anytime.",
        picture: "https://i.pinimg.com/originals/d8/23/75/d82375c1590f1197f481fae586ccf9f1.png",
      },
      {
        id: "b658ddb1-a5a6-4ce8-9fed-6db4a995a0a7",
        name: "SPOTIFY",
        cost: 45000,
        description: "Enjoy ad- free music, listen offline, and more.Cancel anytime.",
        picture: "https://gadgetren.com/wp-content/uploads/2020/02/Spotify-Logo.jpg",
      },
      {
        id: "6a2077db-cee4-4a49-baff-b233462d9d9b",
        name: "HBO NOW",
        cost: 99000,
        description: "HBO (previously called HBO NOW) is a stand-alone streaming service that lets you stream all of HBO without a TV package. You can stream all of HBO's original series, plus hit movies, documentaries, sports, and exclusive comedy specials.",
        picture: "https://techcrunch.com/wp-content/uploads/2015/05/hbo-now-logo.png",
      },
      {
        id: "50db9581-5baf-4f10-a76c-1132f2bdf07a",
        name: "HULU",
        cost: 180000,
        description: "Watch TV shows and movies online. Stream TV episodes of Grey's Anatomy, This Is Us, Bob's Burgers, Brooklyn Nine-Nine, Empire, SNL, and popular movies ...",
        picture: "https://i.pcmag.com/imagery/reviews/0142ww1h6aRqMkc4gP3zfUo-21..1603983170.png",
      },
      {
        id: "acea2109-bfb6-4f54-b267-803c3e1bf842",
        name: "SHOWTIME",
        cost: 170000,
        description: "Watch SHOWTIME wherever and whenever you want - FREE with your SHOWTIME subscription through participating providers.",
        picture: "https://www.sho.com/site/image-bin/images/0_0_0/0_0_0_prm-ogsho_1280x640.jpg",
      },
      {
        id: "03bba082-088b-4204-96cc-6b158a61d403",
        name: "CRUNCHYROLL",
        cost: 180000,
        description: "Enjoy Our Entire Library of Anime and Manga. Get Access to Ad-Free Shows in HD. New Episodes Available as Soon as 1 Hour After Japanese Broadcast. Concurrent Streaming. Anime & Manga. Offline Viewing. 1000+ Series Available. No Ads with Premium.",
        picture: "https://media.comicbook.com/2019/03/crunchyroll-logo-1164033-1280x0.jpeg",
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('services', {})
  }
};
