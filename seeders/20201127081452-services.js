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
      },
      {
        id: v4(),
        name: "PRIME VIDEO",
        description: "Watch movies and TV shows recommended for you, including Amazon Originals like The Boys, Hunters, The Marvelous Mrs. Maisel, Tom Clancy’s Jack Ryan, and much more",
        picture: "https://m.media-amazon.com/images/G/01/primevideo/seo/primevideo-seo-logo-square.png",
      },
      {
        id: v4(),
        name: "DISNEY PLUS",
        description: "Disney+ is the exclusive home for your favorite movies and shows from Disney, Pixar, Marvel, Star Wars, and National Geographic.",
        picture: "https://lumiere-a.akamaihd.net/v1/images/2e3d33fc0eefc265131cc02158c1c69a_4096x2303_0d094a0f.png?region=1,0,4094,2303",
      },
      {
        id: v4(),
        name: "YOUTUBE PREMIUM",
        description: "Ad-free unlimited music & videos. New users 1 month free. Terms apply. YouTube & YouTube Music Premium is ad-free, offline and in the background. Come on, register! YouTube is ad-free. Only one membership. Cancel anytime.",
        picture: "https://www.gstatic.com/youtube/img/promos/growth/ytr_lp2_logo_premium_desktop_552x71.png",
      },
      {
        id: v4(),
        name: "SPOTIFY",
        description: "Enjoy ad- free music, listen offline, and more.Cancel anytime.",
        picture: "https://logos-world.net/wp-content/uploads/2020/09/Spotify-Logo.png",
      },
      {
        id: v4(),
        name: "HBO NOW",
        description: "HBO (previously called HBO NOW) is a stand-alone streaming service that lets you stream all of HBO without a TV package. You can stream all of HBO's original series, plus hit movies, documentaries, sports, and exclusive comedy specials.",
        picture: "https://techcrunch.com/wp-content/uploads/2015/05/hbo-now-logo.png",
      },
      {
        id: v4(),
        name: "HULU",
        description: "Watch TV shows and movies online. Stream TV episodes of Grey's Anatomy, This Is Us, Bob's Burgers, Brooklyn Nine-Nine, Empire, SNL, and popular movies ...",
        picture: "https://i.pcmag.com/imagery/reviews/0142ww1h6aRqMkc4gP3zfUo-21..1603983170.png",
      },
      {
        id: v4(),
        name: "SHOWTIME",
        description: "Watch SHOWTIME wherever and whenever you want - FREE with your SHOWTIME subscription through participating providers.",
        picture: "https://www.sho.com/site/image-bin/images/0_0_0/0_0_0_prm-ogsho_1280x640.jpg",
      },
      {
        id: v4(),
        name: "CRUNCHYROLL",
        description: "Enjoy Our Entire Library of Anime and Manga. Get Access to Ad-Free Shows in HD. New Episodes Available as Soon as 1 Hour After Japanese Broadcast. Concurrent Streaming. Anime & Manga. Offline Viewing. 1000+ Series Available. No Ads with Premium.",
        picture: "https://media.comicbook.com/2019/03/crunchyroll-logo-1164033-1280x0.jpeg",
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('services', {})
  }
};
