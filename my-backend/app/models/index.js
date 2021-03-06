const dbConfig = require("../configs/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// sequelize.authenticate()
// .then(function (err) {
//   console.log("Connection has been established successfully.");
// })
// .catch(function (err) {
//   console.log("Unable to connect to the database:", err);
// });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.products = require("./product.model.js")(sequelize, Sequelize);
db.carts = require("./cart.model.js")(sequelize, Sequelize);
db.delivery = require("./delivery.model")(sequelize, Sequelize);
db.order = require("./order.model")(sequelize, Sequelize);
db.productOrder = require("./productOrder.model")(sequelize, Sequelize);


module.exports = db;