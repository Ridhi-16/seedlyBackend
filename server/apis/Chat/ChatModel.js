const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });   // ✅ THIS LINE IS IMPORTANT

module.exports = mongoose.model("MessageModel", MessageSchema);
