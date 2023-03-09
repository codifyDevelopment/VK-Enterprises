const Sequelize = require("sequelize");
const config = require("config");

const sequelize = new Sequelize(
    config.get("db.database"),
    config.get("db.username"),
    config.get("db.password"),
    {
        host: config.get("db.host"),
        dialect: config.get("db.dialect"),
        logging: false,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, Sequelize);

module.exports = db;
