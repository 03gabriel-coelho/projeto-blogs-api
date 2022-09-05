const express = require('express');

const routes = express.Router();

const { BlogPost, User, Category } = require('../database/models');

const { ValidateNotToken, ValidateUserToken } = require('../middlewares/validateToken');

routes.get('/', ValidateNotToken, ValidateUserToken, async (_req, res) => {
  const posts = await BlogPost.findAll();
  const user = await User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
  const category = await Category.findAll({ attributes: ['id', 'name'] });
  
  const formate = posts.map((post) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    userId: post.userId,
    published: post.published,
    updated: post.updated,
    user: user[post.userId - 1],
    categories: category,
  }));

  res.status(200).json(formate);
});

module.exports = routes;