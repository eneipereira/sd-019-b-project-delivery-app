const { Router } = require('express');
const rescue = require('express-rescue');
const userController = require('../controllers/User.controller');

const userRoute = Router();

userRoute.route('/')
  .post(rescue(userController.login));

userRoute.route('/sellers')
  .get(rescue(userController.getSellers));

userRoute.route('/sellers/:id')
  .get(rescue(userController.getSellerById));

module.exports = userRoute;
