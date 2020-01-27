exports.cors_solver = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // prevent other webpages to accet the API
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // OPTION is a first request made by the browser to check which option we have
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
};
