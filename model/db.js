const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/ecommerce.sqlite',
});

module.exports = sequelize;
