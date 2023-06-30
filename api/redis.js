const Redis = require('ioredis');

const redisClient = new Redis({
  host: 'red-cif2uctgkuvq1o3o1u0g',
  port: 6379,
});

module.exports = redisClient;
