const express = require('express');
const bodyParser = require('body-parser');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const categoriesController = require('./controllers/categoriesController');
const postController = require('./controllers/postController');

// ...

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use('/login', loginController);

app.use('/user', userController);

app.use('/categories', categoriesController);

app.use('/post', postController);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
