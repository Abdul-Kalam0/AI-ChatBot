import Chat from "../models/chatModel.js";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

export const handleChat = async (req, res) => {
  const { message } = req.body;

  if (!message?.trim()) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    if (!req.session.sessionId) {
      req.session.sessionId =
        Date.now().toString() + Math.random().toString(36).slice(2, 8);
      req.session.history = [];
    }

    const sessionId = req.session.sessionId;

    // ✅ full conversation context
    const messages = req.session.history.flatMap((msg) => [
      { role: "user", content: msg.user },
      { role: "assistant", content: msg.bot },
    ]);

    messages.push({ role: "user", content: message });

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile", // ✅ correct Groq model
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const botReply =
      response.data?.choices?.[0]?.message?.content ||
      "I'm sorry, I couldn't process that.";

    // Save DB
    const chat = new Chat({
      sessionId,
      userMessage: message,
      botMessage: botReply,
    });

    await chat.save();

    // Save session
    req.session.history.push({
      user: message,
      bot: botReply,
      timestamp: new Date(),
    });

    if (req.session.history.length > 10) {
      req.session.history = req.session.history.slice(-10);
    }

    await req.session.save();

    res.status(200).json({
      success: true,
      reply: botReply,
      sessionId,
      history: req.session.history,
    });
  } catch (err) {
    console.error("❌ Groq Error:", err.response?.data || err.message);

    res.status(500).json({
      error: "Groq API failed",
    });
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
