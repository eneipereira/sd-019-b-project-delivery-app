'use strict';


module.exports = {
  /**
   * 
   * @param {import("sequelize").QueryInterface} queryInterface 
   * @param {import("sequelize").DataTypes} Sequelize 
   */
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('products', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      price: {
        type: Sequelize.DECIMAL(4,2),
        allowNull: false,
      },

      urlImage: {
        type: Sequelize.STRING,
        defaultValue: '',
        field: 'url_image',
        allowNull: false,
      },

    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');

  }
};
