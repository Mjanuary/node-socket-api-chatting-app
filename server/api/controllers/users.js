const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuidv1 = require("uuid/v1");
const auth = require("../sk");

const User = require("../models/users");

// LIST OF THE USERS
exports.user_list_all = (req, res, next) => {
  User.find()
    .exec()
    .then(users => {
      res.status(200).json({
        results: users.length,
        data: users
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// USERS DETAILS
exports.users_details_user = (req, res, next) => {
  const id = req.params.userId;

  User.findById(id)
    .select("_id username email full_names country friends")
    .exec()
    .then(users => {
      if (users) {
        res.status(200).json({
          results: users.length,
          data: users
        });
      } else {
        res.status(404).json({
          message: "No user found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// REGISTERING USERS IN THE DB
exports.user_signup_user = (req, res, next) => {
  // CHECK IF TN THE USERS DB THERE IS NO DATABASE
  User.find({ email: req.body.email })
    .exec()
    .then(found => {
      console.log("length: ", found.length);

      if (found.length <= 0) {
        // start encryping the password
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            // start registering the user
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              email: req.body.email,
              full_names: req.body.full_names,
              password: hash,
              phone: req.body.phone,
              country: req.body.country
            });

            user
              .save()
              .then(result => {
                // console.log(result);
                res.status(201).json({
                  message: "User created",
                  data: {
                    _id: result._id,
                    username: result.username,
                    email: result.email,
                    full_names: result.full_names,
                    phone: result.phone,
                    country: result.country
                  }
                });
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      } else {
        // if no use found
        res.status(409).json({
          message: "Email alresdy in use"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// DELETE USER
exports.user_delete_user = (req, res, next) => {
  const id = req.params.userId;
  User.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/user",
          body: {
            username: "String",
            email: "Email",
            full_names: "String(Last name) String(Last name)",
            password: "Password",
            country: "String"
          }
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

// UPDATE USERS
exports.user_update_user = (req, res, next) => {
  const id = req.params.userId;
  User.updateOne({ _id: id }, { $set: req.body })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "data updated!",
        data: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// UPDATE PASSWORD
exports.user_update_password = (req, res, next) => {
  const id = req.params.userId;

  bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      // start registering the user
      User.updateOne({ _id: id }, { $set: { password: hash } })
        .exec()
        .then(result => {
          res.status(200).json({
            message: "password updated!"
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    }
  });
};

/// LOGIN
exports.users_login_user = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }

      bcrypt.compare(req.body.password, result.password, (err, success) => {
        if (err) {
          console.log("failed to login the user");

          return res.status(401).json({
            message: "Auth failed"
          });
        }

        // success
        if (success) {
          // generate the token

          const token = jwt.sign(
            {
              email: result.email,
              userId: result._id
            },
            auth.SECRET_KEY,
            { expiresIn: "1h" }
          );

          res.status(200).json({
            message: "Auth Successful",
            _id: result._id,
            token: token
          });
        }
      });
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
};

// inviting friend
exports.user_invite_friend = (req, res, next) => {
  let userId = req.body.userId;
  let friendId = req.body.friendId;
  let chatId = uuidv1();

  let friendRequest_me = {
    chatt_id: chatId,
    userId: userId,
    friend: friendId,
    date: new Date()
  };

  let friendRequest_friend = {
    chatt_id: chatId,
    userId: friendId,
    friend: userId,
    date: new Date()
  };

  User.findById(friendId)
    .exec()
    .then(userFound => {
      if (!userFound) {
        console.log("friend not found");

        return res.status(404).json({
          message: "The friend id id invalid!"
        });
      } else {
        console.log("friend found");

        // check if the user id is valid
        User.findById(userId)
          .exec()
          .then(accountFound => {
            console.log("my accound found");

            // define friend list
            let myFriendsList = [...accountFound.friends];
            if (!accountFound.friends.find(el => el.friend === friendId)) {
              myFriendsList.push(friendRequest_me);
            }

            // define friends friends list
            let firendFriendsList = [...userFound.friends];
            if (!userFound.friends.find(el => el.friend === userId)) {
              firendFriendsList.push(friendRequest_friend);
            }
            //////////////////////////////////////////////////////////////////////

            if (
              userFound.friends.find(el => el.friend === userId) &&
              accountFound.friends.find(el => el.friend === friendId)
            ) {
              res.status(200).json({
                message: "You are already a friend with this user!"
              });
            }

            // start inserting the user
            User.updateOne(
              { _id: userId },
              { $set: { friends: myFriendsList } }
            )
              .exec()
              .then(myResult => {
                // SENDING USER REQUEST TO THE FRIEND //////////////////////////////

                //////////////////////////////////////////////////////////////////////
                // start inserting the user
                User.updateOne(
                  { _id: friendId },
                  { $set: { friends: firendFriendsList } }
                )
                  .exec()
                  .then(friendResult => {
                    // SENDING USER REQUEST TO THE FRIEND //////////////////////////////
                    //********************************************** */
                    res.status(200).json({
                      message: "Friend request sent!"
                    });
                  })
                  .catch(err => {
                    return res.status(500).json({
                      error: err
                    });
                  }); // sending the request to the user
              })
              .catch(err => {
                return res.status(500).json({
                  error: err
                });
              });
          })
          .catch(err => {
            return res
              .status(404)
              .json({ message: "your account id invalid!" });
          }); // search my account
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: err
      });
    }); // firnd found

  // User.update({ _id: id }, { $set: req.body })
  //   .exec()
  //   .then(result => {
  //     res.status(200).json({
  //       message: "data updated!",
  //       data: result
  //     });
  //   })
  //   .catch(err => {
  //     res.status(500).json({
  //       error: err
  //     });
  //   });
};
