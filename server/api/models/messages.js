const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat_Users", // user from id
    required: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat_Users", // user to
    required: true
  },
  date: {
    type: String,
    default: new Date()
  },
  media: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model("Chat_Messages", postSchema);
