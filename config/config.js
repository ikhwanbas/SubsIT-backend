require('dotenv').config()

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": "localhost",
    "dialect": "mysql",
    //biar ga kotor syntax mysql di terminal
    logging: false
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": "localhost",
    "dialect": "mysql"
  }
}
