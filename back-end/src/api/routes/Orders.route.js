const { Router } = require('express');
const rescue = require('express-rescue');
const ordersController = require('../controllers/Orders.controller');

const ordersRouter = Router();

ordersRouter.route('/user/:id')
  .get(rescue(ordersController.getByUserId));

ordersRouter.route('/seller/:id')
  .get(rescue(ordersController.getBySellerId));

module.exports = ordersRouter;