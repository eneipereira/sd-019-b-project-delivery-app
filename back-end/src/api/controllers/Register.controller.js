const { StatusCodes } = require('http-status-codes');
const authService = require('../services/Auth.service');
const registerService = require('../services/Register.service');

const registerController = {
  /** @type {import('express').RequestHandler} */
  async register(req, res) {
    const createUser = await registerService.register(req.body);
    const token = await authService.makeToken(createUser);
    return res.status(StatusCodes.CREATED).json({ token });
  },

};

module.exports = registerController;