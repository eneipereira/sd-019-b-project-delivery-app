const { Router } = require('express');
const rescue = require('express-rescue');
const userController = require('../controllers/User.controller');

const userRoute = Router();

userRoute.route('/')
  .post(rescue(userController.login));

userRoute.route('/users')
  .get(rescue(userController.getAll));

userRoute.route('/sellers')
  .get(rescue(userController.getSellers));

userRoute.route('/sellers/:id')
  .get(rescue(userController.getSellerById));

userRoute.route('/user/:id')
  .delete(rescue(userController.delete));

module.exports = userRoute;
