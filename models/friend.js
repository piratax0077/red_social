const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db');

class friend extends Model {}

friend.init({
    sender_id:DataTypes.INTEGER,
    description: DataTypes.STRING
},{
    timestamps: false, sequelize,modelName:'friend'
})

module.exports = friend;