const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db');

class comment extends Model {}

comment.init({
    description: DataTypes.STRING
},{
    timestamps: true, sequelize,modelName:'comment'
})

module.exports = comment;