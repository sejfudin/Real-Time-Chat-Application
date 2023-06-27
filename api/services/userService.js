const { passwordCrypt, matchPassword } = require('../config/password');
const User = require('../models/userModel');

const registerUser = async (name, email, password) => {
  if (!name || !email || !password) {
    return null;
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return null;
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
    return null;
  }

  const user = await User.findOne({ email });

  if (user && matchPassword(user.password, password)) {
    return user;
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
