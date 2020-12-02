# SubsIT API with sequelize
SubsIT API for SubsIT APP and Web

## Environment variables
```
DB_USERNAME="" # database username
DB_PASSWORD="" # database password
DB_HOST="" # database host
DB_DATABASE="" # database name
PORT= # API port
HOSTNAME=" # API host name
JWT_SECRET="" # secret word for jwt
```

## Installation
- `npm install --no-save` to init project
- `npm run db:create` to create database
- `npm run db:migrate` to migrate table structures
- `npm run db:seed` to run data seeder
- `npm run dev` / `npm start` start project

## testing
- `npm run test` for start testing

## extras
- `npm run migrate:make -- migrationName` to make a migration
- `npm run seed:make -- seedName` to make a seed
- `npm run seed` to run all seed

## reset
- `npm db:drop` for dropping database
- `npm migrate:undo` for undoing migration