const { User } = require('../database/models');

const displayNameError = (req, res, next) => {
  const { displayName } = req.body;

  if (!displayName || displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }

  next();
};

const emailError = (req, res, next) => {
  const { email } = req.body;

  const emailTest = /\S+@\S+\.\S+/;
  const emailValidate = emailTest.test(email);

  if (!email || emailValidate === false) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  }

  next();
};

const passwordError = (req, res, next) => {
  const { password } = req.body;

  if (!password || password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long',
    });
  }

  next();
};

const emailUnique = async (req, res, next) => {
  const { email } = req.body;

  const emailFind = await User.findOne({
    where: { email },
  });

  if (emailFind) {
    return res.status(409).json({
      message: 'User already registered',
    });
  }

  next();
};

module.exports = {
  displayNameError,
  emailError,
  passwordError,
  emailUnique,
};