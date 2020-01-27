const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth"); // authenticatoin fucntion

const UserController = require("../controllers/users");

// get all the users
router.get("/", UserController.user_list_all);
router.get("/", checkAuth, UserController.user_list_all);

// get all the users
router.get("/:userId", checkAuth, UserController.users_details_user);

// signup the users
router.post("/signup", UserController.user_signup_user);

//login the user
router.post("/login", UserController.users_login_user);

//update the user
router.patch("/:userId", checkAuth, UserController.user_update_user);

//update the password
router.patch(
  "/password/:userId",
  checkAuth,
  UserController.user_update_password
);

//login the user
router.delete("/:userId", checkAuth, UserController.user_delete_user);

// invite a friend
router.post("/invite", checkAuth, UserController.user_invite_friend);

module.exports = router;
