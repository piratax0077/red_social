const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db');

class City extends Model {}

City.init({
    name: DataTypes.STRING,
    region: DataTypes.STRING,
    population:DataTypes.INTEGER
},{
    timestamps: false, sequelize,modelName:'city'
})

module.exports = City;