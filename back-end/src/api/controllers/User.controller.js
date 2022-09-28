const { StatusCodes } = require('http-status-codes');
const authService = require('../services/Auth.service');
const userService = require('../services/User.service');

const userController = {
  /** @type {import('express').RequestHandler} */
  async login(req, res) {
    const body = await userService.validateBodyLogin(req.body);
    const user = await userService.getByEmail(body.email);
    
    await userService.verifyPassword(body.password, user.password);
    
    const { password, ...infos } = user;
    
    const token = await authService.makeToken(user);
    
    const data = { ...infos, token };
    
    res.status(StatusCodes.OK).json({ ...data });
  },

  /** @type {import('express').RequestHandler} */
  async getAll(_req, res) {
    const users = await userService.getAll();

    res.status(StatusCodes.OK).json(users);
  },
  
  /** @type {import('express').RequestHandler} */
  async getSellers(_req, res) {
    const sellers = await userService.getSellers();
    
    res.status(StatusCodes.OK).json(sellers);
  },
  
  /** @type {import('express').RequestHandler} */
  async getSellerById(req, res) {
    const { id } = await userService.validateParamsId(req.params);
    
    const seller = await userService.getById(id);
    
    res.status(StatusCodes.OK).json(seller);
  },
  
  /** @type {import('express').RequestHandler} */
  async delete(req, res) {
    const { id } = await userService.validateParamsId(req.params);

    await userService.getById(id);

    await userService.delete(id);

    res.sendStatus(StatusCodes.NO_CONTENT);
  },
};

module.exports = userController;
