const { StatusCodes } = require('http-status-codes');
const ordersServices = require('../services/Orders.service');

const ordersController = {
  async getByUserId(req, res) {
    const { id } = await ordersServices.validateParamsId(req.params);

    const orders = await ordersServices.getByUserId(id);
    
    res.status(StatusCodes.OK).json(orders);
  },

  async getBySellerId(req, res) {
    const { id } = await ordersServices.validateParamsId(req.params);

    const orders = await ordersServices.getBySellerId(id);

    res.status(StatusCodes.OK).json(orders);
  },
};

module.exports = ordersController; 