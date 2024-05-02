const express = require('express');
const authRouter = express.Router();
const {
  signup,
  login,
  forgot,
  resetPassword,
} = require('../controllers/authControllers');

// Routes beginning with /api/auth
authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/forgot', forgot);
authRouter.post('/resetPassword', resetPassword);

module.exports = authRouter;
