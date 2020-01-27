const express = require("express");
const router = express.Router();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv/config");
const auth = require("./sk");

// IMPORT ROUTES
const usersRoute = require("./routes/user");
const postRoute = require("./routes/post");
const messageRoute = require("./routes/message");

// others middleware
const corsMiddleware = require("./middleware/cors-solver");
const errorMiddleware = require("./middleware/errors-handler");
const checkAuth = require("./middleware/check-auth"); // authenticatoin fucntion

//connect
// mongoose.connect(process.env.DB_CONNECTION, {
mongoose.connect(auth.DATABASE_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.Promise = global.Promise;

// middleware of packages
router.use(morgan("dev"));
// work with body parser
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// solving CORS (Error)
router.use(corsMiddleware.cors_solver);

// USE ROUTES
router.use("/user", usersRoute);
router.use("/post", postRoute);
// router.use("/post", checkAuth, postRoute);
router.use("/message", checkAuth, messageRoute);

// error handling (generating error)
router.use(errorMiddleware.error_generating);

// sending error back to the client
router.use(errorMiddleware.error_printing);

module.exports = router;
