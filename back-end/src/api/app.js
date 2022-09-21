const express = require('express');
const errorHandler = require('./middlewares/errorHandler.middleware');
const productRoute = require('./routes/Product.route');
const userRoute = require('./routes/User.route');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use('/login', userRoute);
app.use('/products', productRoute);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorHandler);

module.exports = app;
