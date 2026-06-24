// sequelize/index.js
const sequelize = require("./config");

// Load  models
require("./models/User");
require("./models/contact"); 
// Load associations
require("./relations");

module.exports = sequelize;
