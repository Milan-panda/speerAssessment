const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes - Timeframe 
  max: 100, 
  message: 'Too many requests from this IP, please try again later',
  handler: (req, res) => {
    res.status(429).json({ message: 'Too many requests from this IP, please try again later' });
  },
});

module.exports = limiter;
