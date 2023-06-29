const extractUserId = (req, res, next) => {
  const { senderId } = req.body;
  req.userId = senderId; // Store the userId in the request object
  next();
};

module.exports = extractUserId;
