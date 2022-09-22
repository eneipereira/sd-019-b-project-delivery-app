const express = require('express');
const errorHandler = require('./middlewares/errorHandler.middleware');
const registerRoute = require('./routes/Register.route');
const userRoute = require('./routes/User.route');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', userRoute);

app.use('/register', registerRoute);

app.use(errorHandler);

module.exports = app;
