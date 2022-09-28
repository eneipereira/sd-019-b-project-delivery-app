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

  async getOneOrder(req, res) {
    const orders = await ordersServices.getOneOrder(req.params.id);
    return res.status(StatusCodes.OK).json(orders);
  },

  async updateStatus(req, res) {
    const { id } = await ordersServices.validateParamsId(req.params);

    const body = await ordersServices.validateBodyUpdate(req.body);

    const updated = await ordersServices.updateStatus(id, body);

    res.status(StatusCodes.OK).json(updated);
  },
};

module.exports = ordersController; 