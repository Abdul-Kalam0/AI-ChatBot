import { GoogleGenerativeAI } from "@google/generative-ai";
import Chat from "../models/chatModel.js";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const handleChat = async (req, res) => {
  const { message } = req.body;
  if (!message?.trim())
    return res.status(400).json({ error: "Message is required." });

  try {
    if (!req.session.sessionId) {
      req.session.sessionId =
        Date.now().toString() + Math.random().toString(36).slice(2, 8);
      req.session.history = [];
    }
    const sessionId = req.session.sessionId;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent({ prompt: message });

    // Gemini API response fix
    const botReply =
      result?.candidates?.[0]?.content || "I'm sorry, I couldn't process that.";

    // Save in MongoDB
    const chat = new Chat({
      sessionId,
      userMessage: message,
      botMessage: botReply,
    });
    await chat.save();

    // Save in session
    req.session.history.push({
      user: message,
      bot: botReply,
      timestamp: new Date(),
    });
    if (req.session.history.length > 10)
      req.session.history = req.session.history.slice(-10);
    await req.session.save();

    res.status(200).json({
      success: true,
      reply: botReply,
      sessionId,
      history: req.session.history,
    });
  } catch (err) {
    console.error("❌ Error in handleChat:", err);
    if (err.status === 429)
      return res.status(429).json({ error: "Gemini API rate limit exceeded." });
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getSessionHistory = async (req, res) => {
  res.status(200).json({
    success: true,
    sessionId: req.session.sessionId || null,
    chats: req.session.history || [],
  });
};

export const clearSession = async (req, res) => {
  try {
    if (!req.session.sessionId)
      return res.status(400).json({ error: "No active session found." });

    const sid = req.session.sessionId;
    await Chat.deleteMany({ sessionId: sid });

    req.session.destroy((err) => {
      if (err)
        return res.status(500).json({ error: "Failed to clear session." });
      res.clearCookie("connect.sid");
      res.json({ success: true, message: "Session cleared successfully." });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while clearing session." });
  }
};
