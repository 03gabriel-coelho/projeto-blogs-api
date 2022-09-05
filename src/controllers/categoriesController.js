const express = require('express');

const router = express.Router();

const { Category } = require('../database/models');
const { ValidateNotToken, ValidateUserToken } = require('../middlewares/validateToken');
const { nameError } = require('../middlewares/categoriesMiddleware');

router.post('/', ValidateNotToken, ValidateUserToken, nameError, async (req, res) => {
  const { name } = req.body;

  const categorie = await Category.create({ name });

  res.status(201).json(categorie);
});

router.get('/', ValidateNotToken, ValidateUserToken, async (_req, res) => {
  const categories = await Category.findAll();

  res.status(200).json(categories);
});

module.exports = router;