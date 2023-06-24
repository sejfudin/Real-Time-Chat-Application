const bcrypt = require('bcryptjs');

const passwordCrypt = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hasehedPassword = await bcrypt.hash(password, salt);
  return hasehedPassword;
};

const matchPassword = async (password, enteredPassword) => {
  return await bcrypt.compare(password, enteredPassword);
};

module.exports = { passwordCrypt, matchPassword };
