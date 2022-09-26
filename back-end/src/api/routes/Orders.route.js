const { Router } = require('express');
const rescue = require('express-rescue');
const ordersController = require('../controllers/Orders.controller');

const ordersRouter = Router();

ordersRouter.route('/')
  .post(rescue(ordersController.getCustumerOrders));

  ordersRouter.route('/:id')
  .get(rescue(ordersController.getOneOrder));

module.exports = ordersRouter;