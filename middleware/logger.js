// middleware/logger.js
function logger(req, res, next) {
    // Log relevant information such as request method, route, timestamp, etc.
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
  }
  
  module.exports = logger;
  