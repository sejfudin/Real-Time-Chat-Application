const Redis = require('ioredis');

const redisClient = new Redis('redis://red-cif2uctgkuvq1o3o1u0g:6379');

module.exports = redisClient;
