const mongoose = require("mongoose");

const User = require("../models/users");
const Post = require("../models/posts");

// LIST OF THE POSTS
exports.posts_list_all = (req, res, next) => {
  Post.find()
    .exec()
    .then(post => {
      res.status(200).json({
        results: post.length,
        data: post
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// POST DETAILS
exports.post_details_user = (req, res, next) => {
  const id = req.params.postId;
  if (id === "") {
    return res.status(200).json({
      message: "you must provide a valid id in the url"
    });
  }

  Post.findById(id)
    .exec()
    .then(post => {
      if (post) {
        res.status(200).json({
          results: post.length,
          data: post
        });
      } else {
        res.status(404).json({
          message: "No Post found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// REGISTERING POST IN THE DB
exports.post_register_posts = (req, res, next) => {
  const id = req.params.userId;
  if (!id) {
    return res.status(200).json({
      message: "you must provide a valid user id in the url"
    });
  }
  // CHECK IF TN THE USERS DB THERE IS NO DATABASE
  User.findById(id)
    .exec()
    .then(found => {
      if (!found) {
        return res.status(404).json({
          message: "Unknown user"
        });
      }

      if (req.body.media === "" && req.body.caption === "") {
        return res.status(500).json({
          message: "the caption and media can't both be empty"
        });
      }

      // start registering the user
      const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        user: id,
        date: new Date(),
        media: req.body.media,
        caption: req.body.caption
      });

      post
        .save()
        .then(result => {
          res.status(201).json({
            message: "Post created",
            data: result
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
        message: "Unknown user"
      });
    });
};

// DELETE POST
exports.post_delete_post = (req, res, next) => {
  const id = req.params.postId;

  if (id === "") {
    return res.status(200).json({
      message: "you must provide a valid user id in the url"
    });
  }

  Post.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Post deleted"
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
