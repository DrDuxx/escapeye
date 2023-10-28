const { db } = require("../config/db.config");
const {DataTypes} = require('sequelize')
const fs = require("fs");
const path = require("path");
const basename = path.basename(module.filename);

/**Add the Database Models**/
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(db.sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
