const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messages");

// get message
router.get("/:fromId/:toId", messageController.fetch_chat_messages);

// create message
router.post("/", messageController.insert_message_message);

// delete message
router.delete("/:messageId", messageController.delete_message_id);

//
module.exports = router;
