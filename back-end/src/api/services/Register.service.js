const Joi = require('joi');
const md5 = require('md5');
const models = require('../../database/models');
const runSchema = require('./runSchema');
const userService = require('./User.service');

const registerService = {
  validateBodyRegister(obj) {
    const result = runSchema(Joi.object({
      name: Joi.string().min(12).max(100).required(),
      password: Joi.string().min(6).max(32).required(),
      email: Joi.string().email().required(),
      role: Joi.string().required(),
    }))(obj);

    return result;
  },

  async register(obj) {
    const { name, password, email, role } = obj;

    await userService.exists(email, name);

    const newUser = (await models.User.create({
      name,
      password: md5(password),
      email,
      role,
    })).toJSON();

    return newUser;
  },
};

module.exports = registerService;