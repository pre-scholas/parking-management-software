// Simple rate limiting middleware
const requests = new Map();

export const rateLimiter = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    // Clean up old entries
    for (const [key, data] of requests.entries()) {
      if (now - data.resetTime > windowMs) {
        requests.delete(key);
      }
    }
    
    // Get or create request data for this IP
    let requestData = requests.get(ip);
    if (!requestData) {
      requestData = {
        count: 0,
        resetTime: now
      };
      requests.set(ip, requestData);
    }
    
    // Reset count if window has passed
    if (now - requestData.resetTime > windowMs) {
      requestData.count = 0;
      requestData.resetTime = now;
    }
    
    // Check if limit exceeded
    if (requestData.count >= maxRequests) {
      return res.status(429).json({
        message: 'Too many requests, please try again later',
        retryAfter: Math.ceil((windowMs - (now - requestData.resetTime)) / 1000)
      });
    }
    
    // Increment count and continue
    requestData.count++;
    next();
  };
};