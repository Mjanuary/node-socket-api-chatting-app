const mongoose = require("mongoose");

const messageModel = require("../models/messages");
const Message = require("../models/messages");
const User = require("../models/users");

// LIST ALL THE MESSAGES
exports.fetch_chat_messages = (req, res, next) => {
  const fromId = req.params.fromId;
  const toId = req.params.toId;
  // find if the user exist
  User.findById(toId)
    .exec()
    .then(userFound => {
      console.log("user found!");

      if (!userFound) {
        res.status(404).json({
          message: "Invalid user ID"
        });
      }

      //   Message.find()
      Message.find({
        $or: [
          { from: fromId, to: toId },
          { from: toId, to: fromId }
        ]
      })
        .exec()
        .then(message => {
          res.status(200).json({
            results: message.length,
            data: message
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });

      // end
    })
    .catch(err => {
      res.status(404).json({});
    });
};

// LIST OF THE POSTS
exports.insert_message_message = (req, res, next) => {
  console.log("message from: ", req.body);

  // validation
  if (req.body.from === "" || req.body.to === "" || req.body.message === "") {
    res.status(404).json({
      message: "All the fields are required",
      fields: {
        form: "ID",
        to: "ID",
        message: "String"
      }
    });
  }

  // check if both id are identical
  if (req.body.to === req.body.from) {
    res.status(404).json({
      message: "the message.from and message.to must not be the same"
    });
  }

  // find the ID
  User.findById(req.body.from)
    .exec()
    .then(userFrom => {
      console.log("user 1 found");

      ////////////////////// USER FROM
      // find the ID
      User.findById(req.body.to)
        .exec()
        .then(userTo => {
          console.log("user 2 found");

          // RESORD A MESSAGE ///////////////////////////

          const message = new messageModel({
            _id: new mongoose.Types.ObjectId(),
            from: req.body.from,
            to: req.body.to,
            message: req.body.message
          });

          message
            .save()
            .then(data => {
              res.status(200).json({
                message: "message Sent!",
                message: data
              });
            })
            .catch(err => {
              res.status(500).json({
                error: err
              });
            });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
      // end of user to
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.delete_message_id = (req, res, next) => {
  const id = req.params.messageId;

  Message.deleteOne({ _id: id })
    .exec()
    .then(data => {
      res.status(200).json({
        message: "Message deleted",
        data: data
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
