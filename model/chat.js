const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Chat = sequelize.define(
  'chats',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    message: DataTypes.STRING,
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Chat;
