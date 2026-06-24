const User = require("./models/User");
const ContactAgency = require("./models/contact");

User.hasMany(ContactAgency, { foreignKey: "user_id" });
ContactAgency.belongsTo(User, { foreignKey: "user_id" });

module.exports = { User, ContactAgency };