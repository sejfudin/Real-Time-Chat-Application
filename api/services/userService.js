const { passwordCrypt, matchPassword } = require('../config/password');
const User = require('../models/userModel');

const registerUser = async (name, email, password) => {
  if (!name || !email || !password) {
    throw new Error('All fields are required');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  const hashedPassword = await passwordCrypt(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  return await user.save();
};

const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error('All fields are required');
  }

  const user = await User.findOne({ email });

  if (user && (await matchPassword(password, user.password))) {
    return user;
  } else {
    throw new Error('Invalid email or password');
  }

  return null;
};

const getAllUsers = async (keyword, loggedInUserId) => {
  return await User.find(keyword)
    .find({ _id: { $ne: loggedInUserId } })
    .select('name');
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};
