const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db');

class Post extends Model {}

Post.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING
},{
    timestamps: false, sequelize,modelName:'post'
})

module.exports = Post;