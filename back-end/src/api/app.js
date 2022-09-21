const express = require('express');
const errorHandler = require('./middlewares/errorHandler.middleware');
const userRoute = require('./routes/User.route');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', userRoute);

app.use(errorHandler);

module.exports = app;
