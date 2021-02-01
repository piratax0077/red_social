const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db');

class User extends Model {}

User.init({
    name: DataTypes.STRING,
    email:DataTypes.STRING,
    password: DataTypes.STRING,
    born: DataTypes.DATE,
    image: DataTypes.BLOB
},{
    timestamps: false, sequelize,modelName:'user'
})

module.exports = User;