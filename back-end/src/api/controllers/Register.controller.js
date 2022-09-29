const { StatusCodes } = require('http-status-codes');
const authService = require('../services/Auth.service');
const registerService = require('../services/Register.service');

const registerController = {
  /** @type {import('express').RequestHandler} */
  async register(req, res) {
    const data = await registerService.validateBodyRegister(req.body);

    const createUser = await registerService.register(data);

    const token = await authService.makeToken(createUser);

    res.status(StatusCodes.CREATED).json({ ...createUser.dataValues, token });
  },

};

module.exports = registerController;