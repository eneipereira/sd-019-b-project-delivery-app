const { StatusCodes } = require('http-status-codes');
const productService = require('../services/Product.service');

const productController = {
  /** @type {import('express').RequestHandler} */

  async findAll(_req, res) {
    const products = await productService.findAll();

    res.status(StatusCodes.OK).json(products);
  },
};

module.exports = productController;