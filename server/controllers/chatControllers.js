// import OpenAIApi from "openai";
// import chatModel from "../models/chatModel.js";
// import dotenv from "dotenv";
// dotenv.config();

// const openai = new OpenAIApi({
//   apikey: process.env.OPENAI_API_KEY,
// });

// export const handleChats = async (req, res) => {
//   const { message } = req.body;
//   try {
//     //send user message to OPENAI
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: message }],
//     });

//     const botReply = response.data.choices[0].message.content;

//     const chat = new chatModel({ userMessage: message, botMessage: botReply });
//     await chat.save();

// res
//   .status(201)
//   .json({ success: true, message: "Chat stored successfully", chat });
//   } catch (error) {
//     if (error.code === "insufficient_quota") {
//       return res.status(429).json({
//         error:
//           "Your OpenAI API quota has been exceeded. Please upgrade your plan or try again later.",
//       });
//     }
//     res.status(500).json({ success: false, error: "Something went wrong" });
//   }
// };

import { GoogleGenerativeAI } from "@google/generative-ai";
import Chat from "../models/chatModel.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize the Google Generative AI client with the API key
// The key is loaded from .env file (process.env.GEMINI_API_KEY)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Handles incoming chat messages, sends them to the Gemini model,
 * and saves both the user message and bot reply to the database.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export const handleChat = async (req, res) => {
  // Extract the user's message from the request body
  const { message } = req.body;

  // Basic validation: ensure the user sent a message
  if (!message) {
    return res.status(400).json({ error: "Message content is required." });
  }

  try {
    // Use gemini-2.5-flash for fast and high-quality chat responses
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Generate content from the user's message
    const result = await model.generateContent(message);

    // Extract the plain text response from the model
    // Using .trim() ensures no leading/trailing whitespace
    const botReply = result.response.text();

    // 💾 Save the chat interaction to the MongoDB database using the Chat model
    const chat = new Chat({ userMessage: message, botMessage: botReply });
    await chat.save();

    // Send a successful response back to the client
    res.status(201).json({
      success: true,
      message: "Chat stored successfully and response generated",
      chat,
    });
  } catch (error) {
    // Log the detailed error for debugging
    console.error("Gemini API or Database Error:", error.message);

    // Handle potential rate limit errors (429) from the API
    if (error.status === 429) {
      return res.status(429).json({
        error: "Gemini API rate limit exceeded. Please try again later.",
      });
    }

    // Generic error response
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred while processing the chat.",
    });
  }
};
