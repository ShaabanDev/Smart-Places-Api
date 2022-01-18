const HttpError = require('../models/http-error');
const userModel = require('../models/userModel');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
// login function
const login = async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await userModel.findByEmailAndPassword(email, password);
    res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
  try {
    token = jwt.sign(
      { userId: user.id, email: user.email },
      'user_token_dont_share',
      {
        expiresIn: '1h',
      }
    );
  } catch (error) {
    return next(new HttpError('Could not log in, Please try again later', 500));
  }
  res.status(200).json({ userId: user.id, email: user.email, token });
};

// sign up function
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid Inputs, Please Check Your Data.', 422));
  }
  const { name, email, password, places } = req.body;
  let userExist;
  try {
    userExist = await userModel.findOne({ email });
  } catch (err) {
    return next(
      new HttpError('Could not create a user, Please try again later.', 500)
    );
  }
  if (userExist) {
    return next(
      new HttpError('Email Already exists, Please Login Instead.', 422)
    );
  }
  let user;
  try {
    user = new userModel({
      name,
      email,
      image: req.file.path,
      password,
      places,
    });
    await user.save();
  } catch (err) {
    return next(
      new HttpError('Could not create a user, Please try again later.', 500)
    );
  }
  let token;
  try {
    token = jwt.sign(
      { userId: user.id, email: user.email },
      'user_token_dont_share',
      {
        expiresIn: '1h',
      }
    );
  } catch (error) {
    return next(
      new HttpError('Could not sign up, Please try again later', 500)
    );
  }
  res.status(200).json({ userId: user.id, email: user.email, token });
};

module.exports = { signup, login };
