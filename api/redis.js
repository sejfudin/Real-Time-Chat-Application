const Redis = require('ioredis');

const redisClient = new Redis({
  host: 'red-cif2uctgkuvq1o3o1u0g',
  port: 6379,
  tls: {
    rejectUnauthorized: false, // Set to true if using a valid SSL certificate
  },
});

module.exports = redisClient;
