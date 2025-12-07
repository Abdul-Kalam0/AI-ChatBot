import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  userMessage: { type: String, required: true },
  botMessage: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Chat", chatSchema);
