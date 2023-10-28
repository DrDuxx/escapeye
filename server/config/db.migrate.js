const db = require("../models");
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Synced");
    // We can feed the database with default values like roles and such things like that in here
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(0);
  });
