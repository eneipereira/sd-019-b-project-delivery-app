const { StatusCodes } = require('http-status-codes');
const registerService = require('../services/Register.service');

const registerController = {
  /** @type {import('express').RequestHandler} */
  async register(req, res) {
    const createUser = await registerService.register(req.body);
    return res.status(StatusCodes.OK).json(createUser);
  },

};

module.exports = registerController;