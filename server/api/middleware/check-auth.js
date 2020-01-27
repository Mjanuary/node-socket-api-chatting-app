const jwt = require("jsonwebtoken");
const auth = require("../sk");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log("token: ", token);
    const decoded = jwt.verify(token, auth.SECRET_KEY);
    req.userData = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed"
    });
  }
};
