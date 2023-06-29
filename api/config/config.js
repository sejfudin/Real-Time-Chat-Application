require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'myTopSecretKey',

  //mongo setup
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/db-name',
};

module.exports = config;
