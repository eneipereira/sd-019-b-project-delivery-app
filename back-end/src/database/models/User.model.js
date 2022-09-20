'use strict';

const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  }
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const User = sequelize.define('User', attributes, {
    timestamps: false,
    underscored: true,
    tableName: 'users',
  })

  User.associate = (models) => {
    User.hasMany(models.Sale, { foreignKey: 'userId', as: 'userSales' })
    User.hasMany(models.Sale, { foreignKey: 'sellerId', as: 'sellerSales' })
  }

  return User;
};