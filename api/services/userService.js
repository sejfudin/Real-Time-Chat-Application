const { passwordCrypt, matchPassword } = require('../config/password');
const User = require('../models/userModel');

const registerUser = async (name, email, password, confirmPassword) => {
  if (!name || !email || !password || !confirmPassword) {
    throw new Error('All fields are required');
  }

  if (password !== confirmPassword) {
    throw new Error('Password does not match');
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
  const regex = new RegExp(`^${keyword}`, 'i');
  const key = keyword
    ? {
        $or: [{ name: { $regex: regex } }, { email: { $regex: regex } }],
      }
    : {};

  return await User.find(key)
    .find({ _id: { $ne: loggedInUserId } })
    .select('name');
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};
