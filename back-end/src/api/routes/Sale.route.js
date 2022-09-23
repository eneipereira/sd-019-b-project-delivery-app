const { Router } = require('express');
const rescue = require('express-rescue');
const saleController = require('../controllers/Sale.controller');

const saleRoute = Router();

saleRoute.route('/')
  .post(rescue(saleController.create));
  
module.exports = saleRoute;
