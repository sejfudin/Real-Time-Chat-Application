const generateToken = require('../config/genarateToken');
const { passwordCrypt, matchPassword } = require('../config/password');
const User = require('../models/userModel');
const userService = require('../services/userService');

//Register new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const createdUser = await userService.registerUser(name, email, password);

  if (createdUser) {
    res.status(201).json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      token: generateToken(createdUser._id),
    });
  } else {
    res.status(400);
    throw new Error('User registration failed!');
  }
};

//Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.loginUser(email, password);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password!');
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
  console.log(users);
  res.send(users);
};

module.exports = { registerUser, loginUser, allUsers };
