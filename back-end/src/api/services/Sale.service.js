const Joi = require('joi');
const Sequelize = require('sequelize');
const NotFoundError = require('../errors/NotFoundError');
const runSchema = require('./runSchema');

const models = require('../../database/models');
const config = require('../../database/config/config');

/** @type {import('sequelize').Sequelize} */
const sequelize = new Sequelize(config.development);

const saleService = {
  async validateBodySaleAdd(body) {
    const result = await runSchema(Joi.object({
      userId: Joi.number().required().integer().positive(),
      sellerId: Joi.number().required().integer().positive(),
      totalPrice: Joi.number().required().positive(),
      deliveryAddress: Joi.string().required(),
      deliveryNumber: Joi.string().required(),
      status: Joi.string().required(),
      products: Joi.array().required().min(1).items(
        Joi.object({
          productId: Joi.number().required().positive().integer(),
          quantity: Joi.number().required().integer().positive()
          .min(1),
        }),
      ),
    }))(body);

    return result;
  },

  async validateProducts(products) {
    const data = await Promise.all(
      products.map((product) =>
        models.Product.findOne({ where: { id: product.productId }, raw: true })),
    );

    const exists = data.every((each) => each);

    if (!exists) throw new NotFoundError('product(s) not found');
  },

  async create(id, data) {
    const { products, ...saleInfos } = data;

    const result = await sequelize.transaction(async (t) => {
      const newSale = await models.Sale.create(
        { userId: id, ...saleInfos },
        { transaction: t, raw: true },
      );

      const SaleProducts = products.map((product) => ({
        saleId: newSale.id, productId: product.productId, quantity: product.quantity,
      }));

      await models.SalesProduct.bulkCreate(SaleProducts, { transaction: t });

      return newSale;
    });

    return result;
  },
};

module.exports = saleService;