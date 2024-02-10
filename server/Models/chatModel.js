import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    members: { // the id of the users who are in the chat
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.model("Chat", ChatSchema);
export default ChatModel;