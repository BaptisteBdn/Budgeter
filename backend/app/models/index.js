const dbConfig = require("../config/db.config.js");

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.transactions = require("./transaction.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.category = require("../models/category.model.js")(sequelize, Sequelize);

db.user.hasMany(db.transactions, { as: "transactions" });
db.transactions.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

module.exports = db;
