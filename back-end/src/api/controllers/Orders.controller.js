const { StatusCodes } = require('http-status-codes');
const ordersServices = require('../services/Orders.service');

const ordersController = {
  async getCustumerOrders(req, res) {
    const orders = await ordersServices.getCustumerOrders(req.body.id);
    return res.status(StatusCodes.OK).json(orders);
  },

  async getOneOrder(req, res) {
    const orders = await ordersServices.getOneOrder(req.params.id);
    return res.status(StatusCodes.OK).json(orders);
  },
};

module.exports = ordersController; 