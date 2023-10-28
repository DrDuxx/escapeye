const pgtools = require("pgtools");
const { config } = require("./db.config");

const client = {
  user: config.user,
  host: config.host,
  password: config.password,
  port: config.port,
};

pgtools.createdb(client, config.db, function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  if (res) {
    console.log(res);
  }
});
