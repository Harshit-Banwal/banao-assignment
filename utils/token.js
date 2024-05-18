const jwt = require('jsonwebtoken');

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_CODE);
};

module.exports = {
  createAccessToken,
};
