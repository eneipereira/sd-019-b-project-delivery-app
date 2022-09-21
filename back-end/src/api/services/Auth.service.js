require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'grupo3omelhor';

const authService = {
  async makeToken(user) {
    const { id, name, email } = user;

    const jwtConfig = {
      algorithm: 'HS256',
      expiresIn: '12h',
    };

    const payload = { data: { id, name, email } };

    const token = jwt.sign(payload, secret, jwtConfig);

    return token;
  },
};

module.exports = authService;
