const { Router } = require('express');
const rescue = require('express-rescue');
const registerController = require('../controllers/Register.controller');

const registerRoute = Router();

registerRoute.route('/')
  .post(rescue(registerController.register));

registerRoute.route('/admin')
  .post(rescue(registerController.admRegister));

module.exports = registerRoute;
