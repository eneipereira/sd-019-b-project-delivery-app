'use strict';

const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(9, 2),
    allowNull: false,
  },
  deliveryAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deliveryNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  saleDate: {
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('now'),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const Sale = sequelize.define('Sale', attributes, {
    timestamps: false,
    underscored: true,
    tableName: 'sales',
  })

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'userId', as: 'users' })
    Sale.belongsTo(models.User, { foreignKey: 'sellerId', as: 'sellers' })
  }

  return Sale;
};