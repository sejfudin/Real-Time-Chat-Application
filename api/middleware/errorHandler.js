const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500);
  res.send({ error: true, message: error.message || 'Internal Server Error' });
};

module.exports = errorHandler;
