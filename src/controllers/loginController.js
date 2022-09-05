require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const { userLogin, fieldsLogin } = require('../middlewares/loginMiddleware');

const router = express.Router();

const secret = process.env.JWT_SECRET;

router.post('/', fieldsLogin, userLogin, (req, res) => {
  const { email } = req.body;

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: email }, secret, jwtConfig);

  res.status(200).json({ token });
});

module.exports = router;
