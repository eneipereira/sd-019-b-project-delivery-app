'use strict';


module.exports = {
  /**
   * 
   * @param {import("sequelize").QueryInterface} queryInterface 
   * @param {import("sequelize").DataTypes} Sequelize 
   */
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('sales', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        },
      },

      sellerId: {
        type: Sequelize.INTEGER,
        field: 'seller_id',
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        },

      },

      totalPrice: {
        type: Sequelize.DECIMAL(9,2),
        field: 'total_price',
        allowNull: false,
      },

      deliveryAddress: {
        type: Sequelize.STRING,
        field: 'delivery_address',
        allowNull: false,
      },

      deliveryNumber: {
        type: Sequelize.STRING,
        field: 'delivery_number',
        allowNull: false,
      },

      saleDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
        field: 'sale_date',
        allowNull: false,
      },

      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },

    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};
