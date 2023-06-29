const generateToken = require('../config/genarateToken');
const User = require('../models/userModel');
const redisClient = require('../redis');
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
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    next({ message: error.message });
  }
};

//Get all users
const allUsers = async (req, res, next) => {
  try {
    const loggedInUserId = req.user?._id;
    const keyword = req.query.search;
    const loggedUserIds = await redisClient.smembers('loggedUsers');
    const users = await userService.getAllUsers(keyword, loggedInUserId);

    //Check for searched users- is logged in or not
    const usersWithStatus = users.map((user) => {
      const isOnline = loggedUserIds.some((loggedUserId) => loggedUserId === user._id.toString());
      return { ...user.toObject(), isOnline };
    });

    res.send(usersWithStatus);
  } catch (error) {
    next({ message: error.message });
  }
};

//Logout user
const logoutUser = async (req, res, next) => {
  const { userId } = req.body;
  try {
    await redisClient.srem('loggedUsers', 0, userId);

    res.send({});
  } catch (error) {
    next({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, allUsers, logoutUser };
