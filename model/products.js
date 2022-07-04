const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Products = sequelize.define(
  'products',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    image: DataTypes.STRING,
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Products;
