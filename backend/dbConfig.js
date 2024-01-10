const { Sequelize } = require("sequelize");

const db = new Sequelize("EventsIDF", "postgres", "Aa123456123456", {
  dialect: "postgres", // Use 'postgres' as the dialect for PostgreSQL
  host: "localhost", // Change this to your PostgreSQL server's host
});

module.exports = db;
