const Joi = require('joi');
const models = require('../../database/models');
const runSchema = require('./runSchema');
const BadRequestError = require('../errors/BadRequestError');
const userService = require('./User.service');

const ordersServices = {
  async validateParamsId(params) {
    const result = runSchema(Joi.object({
    id: Joi.number().required().integer().positive(),
    }))(params);

    return result;
  },

  async getByUserId(id) {
    if (!id) {
      throw new BadRequestError('Id not found');
    }

    await userService.getById(id);

    const orders = await models.Sale.findAll({ 
      where: { userId: id },
      include: [{ 
        model: models.Product,
        as: 'products',
        through: { attributes: ['quantity'], as: 'prodQty' } }],
    });
    return orders;
  },

  async getBySellerId(id) {
    if (!id) {
      throw new BadRequestError('Id not found');
    }

    await userService.getById(id);

    const sellerOrders = await models.Sale.findAll({ 
      where: { sellerId: id },
    });
    return sellerOrders;
  },
};

module.exports = ordersServices;