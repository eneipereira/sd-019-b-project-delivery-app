'use strict';


module.exports = {
  /**
   * 
   * @param {import("sequelize").QueryInterface} queryInterface 
   * @param {import("sequelize").DataTypes} Sequelize 
   */
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('salesProducts', { 
      saleId: {
        type: Sequelize.INTEGER,
        field: 'sale_id',
        allowNull: false,
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'sales',
          key: 'id'
        },
      },

      productId: {
        type: Sequelize.INTEGER,
        field: 'product_id',
        allowNull: false,
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'products',
          key: 'id'
        },
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('salesProducts');

  }
};
