import logger from "../log/logger.js";

// Middleware to log endpoint, request body, and status
module.exports = function (req, res, next) {
  const startTime = new Date();

  // Log the endpoint and request body
  logger.info(`Endpoint: ${req.method} ${req.originalUrl}`);
  // log body should be removed if path equal signup or signin
  if (req.originalUrl !== "/signup" && req.originalUrl !== "/signin") {
    logger.info(`Request Body: ${JSON.stringify(req.body)}`);
  }

  // Flag to ensure we only log once
  let logged = false;

  // Function to log response info
  const logResponse = () => {
    if (!logged) {
      const endTime = new Date();
      const elapsedTime = endTime - startTime;

      // Log the response status
      logger.info(`Status: ${res.statusCode}`);
      logger.info(`Response Time: ${elapsedTime}ms`);

      logged = true;
    }
  };

  // Override the res.send method
  const originalSend = res.send;
  res.send = function (...args) {
    logResponse();
    originalSend.apply(res, args);
  };

  // Also catch the response finish event
  res.on("finish", logResponse);

  next();
};
