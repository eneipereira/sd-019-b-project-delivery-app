const { StatusCodes } = require('http-status-codes');

const errors = {
  BadRequestError: 400,
  ValidationError: 400,
  JsonWebTokenError: 401,
  NotFoundError: 404,
};

/**
 * 
 * @param {Error} err 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */

const errorHandler = (err, _req, res, _next) => {
  const status = errors[err.name];

  if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(StatusCodes.CONFLICT).json({ message: err.errors[0].message });
    return;
  }

  if (!status) {
    res.status(500).json({ message: err.message });
    return;
  }

  res.status(status).json({ message: err.message });
};

module.exports = errorHandler;