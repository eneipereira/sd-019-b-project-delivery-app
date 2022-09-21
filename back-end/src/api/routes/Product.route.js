const { Router } = require('express');
const rescue = require('express-rescue');
const productController = require('../controllers/Product.controller');

const productRoute = Router();

productRoute.route('/')
  .get(rescue(productController.findAll));

module.exports = productRoute;
