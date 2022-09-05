const { User } = require('../database/models');

const fieldsLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || email === '' || !password || password === '') {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }

  next();
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email, password },
  });

  console.log(user);

  if (!user) {
    return res.status(400).json({
      message: 'Invalid fields',
  });
}
  
  next();
};

module.exports = {
  fieldsLogin,
  userLogin,
};