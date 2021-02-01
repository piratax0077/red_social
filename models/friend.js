const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db');

class friend extends Model {}

friend.init({
    description: DataTypes.STRING,
    isAccepted: DataTypes.BOOLEAN
},{
    timestamps: false, sequelize,modelName:'friend'
})

module.exports = friend;