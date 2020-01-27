const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");

// get all the posts
router.get("/", postController.posts_list_all);

// get one post
router.get("/:postId", postController.post_details_user);

// create post
router.post("/:userId", postController.post_register_posts);

//login the post
router.delete("/:postId", postController.post_delete_post);

module.exports = router;
