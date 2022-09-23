const { Router } = require('express');
const rescue = require('express-rescue');
const ordersController = require('../controllers/Orders.controller');

const ordersRouter = Router();

ordersRouter.route('/')
  .post(rescue(ordersController.getCustumerOrders));

module.exports = ordersRouter;