const {DataTypes} = require('sequelize');
const sequelize = require('../config');
const User = sequelize.define('User', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    isAdmin : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
        
    } , 
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
})



module.exports = User;