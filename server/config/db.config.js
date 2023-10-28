const { Sequelize } = require("sequelize");
const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USERNAME || "escape",
  password: process.env.DB_PASSWORD || "123456",
  db: process.env.DB_DATABASE || "escape",
  dialect: process.env.DB_CONNECTION || "postgres",
  port: process.env.DB_PORT || 5432,
};

const sequelize = new Sequelize(config.db, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: config.port,
  logging: process.env.NODE_ENV === "development" ? console.log : false,
});

db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = { db, config };
