const Joi = require('joi');
const md5 = require('md5');
const models = require('../../database/models');
const BadRequestError = require('../errors/BadRequestError');

const registerService = {
  validateRegisterObj(obj) {
    const schema = Joi.object({
      name: Joi.string().min(12).max(50).required(),
      password: Joi.string().min(6).required(),
      email: Joi.string().email().required(),
      role: Joi.string().required(),
    });

    const result = schema.validate(obj);
    if (result.error) {
      throw new BadRequestError(result.error.message);
    }
  },

  async register(obj) {
    this.validateRegisterObj(obj);
    await models.User.create({
      name: obj.name,
      password: md5(obj.password),
      email: obj.email,
      role: obj.role,
    });

    const user = await models.User.findOne({
      where: { email: obj.email },
      raw: true,
      attributes: { exclude: ['password'] },
    });

    return user;
  },
};

module.exports = registerService;