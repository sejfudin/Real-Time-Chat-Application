const Redis = require('ioredis');

const redisClient = require('../redis');

const rateLimiter = (req, res, next) => {
  const userId = req.userId;

  const redisKey = `ratelimiter:${userId}`;

  // Get the current count from Redis
  redisClient.get(redisKey, (err, count) => {
    if (err) {
      // Handle Redis error
      console.error('Redis error:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    const limit = 50;

    // Check if the rate limit is exceeded
    if (count && parseInt(count, 10) >= limit) {
      const retryAfter = 30;

      res.status(429).json({
        message: `You have reached the limit of 50 messages per minute. Wait for ${retryAfter} seconds.`,
        retryAfter,
      });
    } else {
      // Increase the count and set an expiration time
      redisClient
        .multi()
        .incr(redisKey)
        .expire(redisKey, 60) // Set expiration time to 60 seconds
        .exec((incrErr) => {
          if (incrErr) {
            // Handle Redis error
            console.error('Redis error:', incrErr);
            res.status(500).json({ message: 'Internal server error' });
            return;
          }
          next();
        });
    }
  });
};
module.exports = rateLimiter;
