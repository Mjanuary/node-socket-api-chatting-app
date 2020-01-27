exports.error_generating = (req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
};

exports.error_printing = (error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
};
