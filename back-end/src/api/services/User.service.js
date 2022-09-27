const md5 = require('md5');
const Joi = require('joi');
const models = require('../../database/models');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const runSchema = require('./runSchema');
const ConflictError = require('../errors/ConflictError');

const userService = {
  async validateBodyLogin(body) {
    const result = runSchema(Joi.object({
      email: Joi.string().required().email().max(255),
      password: Joi.string().required().min(6),
    }).messages({
      'any.required': '{{#label}} is required',
      'string.empty': '{{#label}} is not allowed to be empty',
      'string.email': 'Invalid email format',
      'string.min': '{{#label}} must have a minimun length of {{#limit}}',
    }))(body);

    return result;
  },

  async verifyPassword(password, hashedPassword) {
    const md5Pass = md5(password);

    if (md5Pass !== hashedPassword) throw new BadRequestError('Incorrect password');
  },

  async getByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
      raw: true,
    });

    if (!user) throw new NotFoundError('User not found');

    return user;
  },

  async getById(id) {
    const user = await models.User.findOne({
      where: { id },
      raw: true,
    });

    if (!user) throw new NotFoundError('User not found');
    
    return user;
  },
    
  async getSellers() {
    const sellers = await models.User.findAll({
      where: { role: 'seller' },
      raw: true,
    });

    if (!sellers) throw new NotFoundError('Sellers not found');

    return sellers;
  },
  
  async exists(email, name) {
    const exists = await models.User.findOne({
      where: { email },
      raw: true,
    });

    if (exists) {
      if (exists.name === name) throw new ConflictError('Name already in use!');
  
      if (exists.email === email) throw new ConflictError('Email already in use!');
    }
  },
};

module.exports = userService;
