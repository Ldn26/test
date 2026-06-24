require("dotenv").config();
const Sequelize = require("sequelize");




const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialactOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

module.exports = sequelize;