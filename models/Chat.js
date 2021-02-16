const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    message: {
      type: String
    },
    username: {
      type: String
    }
  }
);

let Chat = mongoose.model("theChat", chatSchema);

module.exports = Chat;
