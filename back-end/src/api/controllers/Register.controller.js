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

  async admRegister(req, res) {
    const data = await registerService.validateBodyRegister(req.body);
    const token = req.headers.authorization;
    
    const { role } = await authService.readToken(token);

    if (role !== 'administrator') {
      return res.status(StatusCodes.UNAUTHORIZED).json(
        { message: 'Only admins can register new admins' },
      );
    }

    const createUser = await registerService.register(data);

    const userToken = await authService.makeToken(createUser);

    res.status(StatusCodes.CREATED).json({ ...createUser, userToken });
  },
};

module.exports = registerController;
