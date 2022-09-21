const Joi = require('joi');
const models = require('../../database/models');
const BadRequestError = require('../errors/BadRequestError');

const registerService = {
  validateRegisterObj(obj) {
    const schema = Joi.object({
      name: Joi.string().min(12).max(50).required(),
      password: Joi.string().min(6).required(),
      email: Joi.string().email().required(),
    });

    const result = schema.validate(obj);
    if (result.error) {
      throw new BadRequestError(result.error.message);
    }
    return result;
  },

  async register(obj) {
    const validatedObj = this.validateRegisterObj(obj);
    const createdUser = await models.User.upsert({
      ...validatedObj,
    });
    return createdUser;
  },
};

module.exports = registerService;