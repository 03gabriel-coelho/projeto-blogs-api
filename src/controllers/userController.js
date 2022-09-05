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
const { ValidateNotToken, ValidateUserToken } = require('../middlewares/validateToken');

const router = express.Router();

const secret = process.env.JWT_SECRET;

router.post('/', displayNameError, emailError, passwordError, emailUnique, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { displayName } }, secret, jwtConfig);
  
  try {
    await User.create({ displayName, email, password, image });

    return res.status(201).json({ token });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.get('/:id', ValidateNotToken, ValidateUserToken, async (req, res) => {
    const { id } = req.params;
    
    const user = await User.findOne({
      where: { id },
      attributes: ['id', 'displayName', 'email', 'image'],
    });
  
    if (!user) {
      return res.status(404).json({
        message: 'User does not exist',
      });
    }
  
    res.status(200).json(user);
});

router.get('/', ValidateNotToken, ValidateUserToken, async (_req, res) => {
  const users = await User.findAll({
    attributes: ['displayName', 'email', 'image'],
  });

  res.status(200).json(users);
});

module.exports = router;