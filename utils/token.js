const jwt = require('jsonwebtoken');

const createAccessToken = (payload) => {
  return jwt.sign(payload, 'harshit');
};

module.exports = {
  createAccessToken,
};
