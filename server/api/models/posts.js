const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat_Users", // name of the modal
    required: true
  },
  date: {
    type: String,
    required: true
  },
  media: {
    type: String
  },
  caption: {
    type: String
  }
});

module.exports = mongoose.model("Chat_Posts", postSchema);
