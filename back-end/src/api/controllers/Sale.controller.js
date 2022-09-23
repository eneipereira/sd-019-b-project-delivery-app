const authService = require('../services/Auth.service');
const saleService = require('../services/Sale.service');

const saleController = {
  /** @type {import('express').RequestHandler} */
  async create(req, res) {
    const token = req.headers.authorization;
    
    const { id } = await authService.readToken(token);
    
    const data = await saleService.validateBodySaleAdd(req.body);
    
    await saleService.validateProducts(data.products);
    
    const newSale = await saleService.create(id, { ...data });

    res.status(201).json(newSale);
  },
};

module.exports = saleController;