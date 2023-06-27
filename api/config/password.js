const bcrypt = require('bcryptjs');

const passwordCrypt = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hasehedPassword = await bcrypt.hash(password, salt);
  return hasehedPassword;
};

const matchPassword = async (enteredPassword, password) => {
  return await bcrypt.compare(enteredPassword, password);
};

module.exports = { passwordCrypt, matchPassword };
