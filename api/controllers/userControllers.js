const generateToken = require('../config/genarateToken');
const User = require('../models/userModel');
const userService = require('../services/userService');

//Register new user
const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const createdUser = await userService.registerUser(name, email, password);

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
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: '^' + req.query.search, $options: 'i' } },
          { email: { $regex: '^' + req.query.search, $options: 'i' } },
        ],
      }
    : {};

  const loggedInUserId = req.user?._id;

  const users = await userService.getAllUsers(keyword, loggedInUserId);
  res.send(users);
};

module.exports = { registerUser, loginUser, allUsers };
