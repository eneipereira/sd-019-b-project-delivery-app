const models = require('../../database/models');

const productService = {
  async findAll() {
    const products = await models.Product.findAll();

    return products;
  },
};

module.exports = productService;