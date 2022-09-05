require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const {
    displayNameError,
    emailError,
    passwordError,
    emailUnique,
  } = require('../middlewares/userMiddleware');

const router = express.Router();

const secret = process.env.JWT_SECRET;

router.post('/', displayNameError, emailError, passwordError, emailUnique, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: displayName }, secret, jwtConfig);
  
  try {
    await User.create({ displayName, email, password, image });

    return res.status(201).json({ token });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;