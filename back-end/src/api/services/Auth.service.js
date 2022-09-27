const jwt = require('jsonwebtoken');
const fs = require('fs');

const path = 'jwt.evaluation.key';
const secret = fs.readFileSync(path, { encoding: 'utf8' });

const authService = {
  async makeToken(user) {
    const { id, role, name, email } = user;

    const jwtConfig = {
      algorithm: 'HS256',
      expiresIn: '12h',
    };

    const payload = { id, role, name, email };

    const token = jwt.sign(payload, secret, jwtConfig);

    return token;
  },

  async readToken(token) {
    const data = jwt.verify(token, secret, (err, decoded) => {
        if (!token) {
          throw new jwt.JsonWebTokenError('Token not found');
        }
        if (err && (err.message.includes('invalid') || err.message.includes('malformed'))) {
          throw new jwt.JsonWebTokenError('Expired or invalid token');
        }
      return decoded;
    });
  
    return data;
  },
};

module.exports = authService;
