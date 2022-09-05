require('dotenv').config();

const jwt = require('jsonwebtoken');

// const { User } = require('../database/models');

const secret = process.env.JWT_SECRET;

const ValidateNotToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({
        message: 'Token not found',
      });
    }
  
    next();
  };

const ValidateUserToken = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, secret);

    if (decoded) return next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  ValidateNotToken,
  ValidateUserToken,
};