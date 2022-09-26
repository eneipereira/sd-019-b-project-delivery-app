const models = require('../../database/models');
const BadRequestError = require('../errors/BadRequestError');
const userService = require('./User.service');

const ordersServices = {
  async getCustumerOrders(id) {
    if (!id) {
      throw new BadRequestError('Id not found');
    }
    await userService.getById(id);
    const orders = await models.Sale.findAll({ 
      where: { userId: id },
    });
    return orders;
  },

  async getOneOrder(id) {
    if (!id) {
      throw new BadRequestError('Id not found');
    }
    const orders = await models.SalesProduct.findOne({ 
      where: { saleId: id },
    });
    if (!orders) {
      throw new BadRequestError('Product not found');
    }
    return orders;
  },
};

module.exports = ordersServices;