const generateToken = require('../config/genarateToken');
const User = require('../models/userModel');
const userService = require('../services/userService');

//Register new user
const registerUser = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    const createdUser = await userService.registerUser(name, email, password, confirmPassword);

    if (createdUser) {
      res.status(201).json({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        token: generateToken(createdUser._id),
      });
    }
  } catch (error) {
    next({ message: error.message });
  }
};

//Login user
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userService.loginUser(email, password);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    next({ message: error.message });
  }
};

//Get all users
const allUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user?._id;
    const keyword = req.query.search;
    const users = await userService.getAllUsers(keyword, loggedInUserId);
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, allUsers };
