const { Sequelize } = require('sequelize');
var config = require('../config/index');

const sequelize = new Sequelize(config.name, config.user, config.password, {
    host: config.host,
    dialect: 'mssql',
    port: config.port
  });

module.exports = sequelize;