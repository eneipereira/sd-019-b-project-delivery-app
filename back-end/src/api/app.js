const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler.middleware');
const productRoute = require('./routes/Product.route');
const saleRoute = require('./routes/Sale.route');
const registerRoute = require('./routes/Register.route');
const userRoute = require('./routes/User.route');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

app.use('/login', userRoute);
app.use('/products', productRoute);
app.use('/sales', saleRoute);
app.use('/register', registerRoute);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorHandler);

module.exports = app;
