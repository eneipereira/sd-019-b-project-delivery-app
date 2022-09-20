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
    unique: true,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  urlImage: {
    type: DataTypes.STRING,
    allowNull: false,
  }
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const Product = sequelize.define('Product', attributes, {
    timestamps: false,
    underscored: true,
    tableName: 'products',
  })

  return Product;
};