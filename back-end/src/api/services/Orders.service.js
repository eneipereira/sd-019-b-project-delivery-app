const Joi = require('joi');
const models = require('../../database/models');
const runSchema = require('./runSchema');
const userService = require('./User.service');

const ordersServices = {
  async validateParamsId(params) {
    const result = runSchema(Joi.object({
    id: Joi.number().required().integer().positive(),
    }))(params);

    return result;
  },

  async getByUserId(id) {
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
    await userService.getById(id);

    const sellerOrders = await models.Sale.findAll({ 
      where: { sellerId: id },
      include: [{ 
        model: models.Product,
        as: 'products',
        through: { attributes: ['quantity'], as: 'prodQty' } }],
    });
    return sellerOrders;
   },

  async getOneOrder(id) {
    const product = await models.Sale.findAll({
      where: { id },
      include: [{
        model: models.Product,
        as: 'products',
        through: { attributes: ['quantity'], as: 'prodQty' } }],
    });
    return product;
  },
};

module.exports = ordersServices;