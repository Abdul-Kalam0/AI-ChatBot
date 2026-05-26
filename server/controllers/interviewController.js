import mongoose from "mongoose";
import Interview from "../models/interviewModel.js";
import Message from "../models/messageModel.js";

import { generateAIResponse } from "../services/aiService.js";

import { generateInterviewFeedback } from "../services/feedbackService.js";
import interviewModel from "../models/interviewModel.js";

// ==========================================
// START INTERVIEW
// ==========================================
export const startInterview = async (req, res) => {
  try {
    const { techStack, difficulty } = req.body;

    // validation
    if (!techStack || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Tech stack and difficulty are required",
      });
    }

    // create interview
    const interview = await Interview.create({
      userId: req.user.id,
      techStack,
      difficulty,
    });

    // generate first AI question
    const firstQuestion = await generateAIResponse(
      [
        {
          role: "user",
          content: "Start the interview with the first question.",
        },
      ],
      techStack,
      difficulty,
    );

    // save AI question
    await Message.create({
      interviewId: interview._id,

      role: "ai",

      content: firstQuestion,

      questionNumber: 1,
    });

    res.status(201).json({
      success: true,

      interviewId: interview._id,

      question: firstQuestion,
      techStack,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

// ==========================================
// ANSWER QUESTION
// ==========================================
export const answerQuestion = async (req, res) => {
  try {
    const { interviewId, answer } = req.body;

    // validation
    if (!interviewId) {
      return res.status(400).json({
        success: false,
        message: "Interview ID is required",
      });
    }

    // fallback for auto submit
    const safeAnswer = answer?.trim() || "No answer provided";

    // find interview
    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    // already completed
    if (interview.completed) {
      return res.status(400).json({
        success: false,
        message: "Interview already completed",
      });
    }

    // save user answer
    await Message.create({
      interviewId,

      role: "user",

      content: safeAnswer,

      questionNumber: interview.currentQuestion,
    });

    // get interview history
    const history = await Message.find({
      interviewId,
    }).sort({
      createdAt: 1,
    });

    // convert to AI format
    const formattedMessages = history.map((msg) => ({
      role: msg.role === "ai" ? "assistant" : "user",

      content: msg.content,
    }));

    // increment question number
    interview.currentQuestion += 1;

    let aiReply = "";

    // generate next question ONLY
    // if interview not completed
    if (interview.currentQuestion < interview.totalQuestion) {
      aiReply = await generateAIResponse(
        formattedMessages,
        interview.techStack,
        interview.difficulty,
      );

      // save AI response
      await Message.create({
        interviewId,

        role: "ai",

        content: aiReply,

        questionNumber: interview.currentQuestion,
      });
    }

    // ==========================================
    // INTERVIEW COMPLETION + FEEDBACK
    // ==========================================
    if (interview.currentQuestion >= interview.totalQuestion) {
      // mark completed
      interview.completed = true;

      // completion message
      aiReply = "🎉 Interview completed successfully!";

      // generate feedback
      const feedback = await generateInterviewFeedback(
        formattedMessages,
        interview.techStack,
        interview.difficulty,
      );

      // save score
      interview.score = feedback.score;

      // save feedback
      interview.feedback = {
        strength: feedback.strengths,

        weakness: feedback.weaknesses,

        summary: feedback.summary,
      };
    }

    // save interview
    await interview.save();

    res.status(200).json({
      success: true,

      reply: aiReply,

      currentQuestion: interview.currentQuestion,

      completed: interview.completed,

      feedback: interview.feedback,

      score: interview.score,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const feedbackSummary = async (req, res) => {
  const { interviewId } = req.params;
  try {
    if (!mongoose.isValidObjectId(interviewId)) {
      return res.status().json({
        success: false,
        message: "Invalid Interview ID",
      });
    }
    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "No interview found",
      });
    }
    res.status(200).json({
      sucess: false,
      data: interview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getHistory = async (req, res) => {
  try {
    const interviews = await interviewModel
      .find({
        userId: req.user.id,
        completed: true,
      })
      .sort({ createdAt: -1 })
      .limit(4)
      .select("techStack difficulty score feedback.summary createdAt");

    if (interviews.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No interview history found",
      });
    }
    return res.status(200).json({
      success: true,
      data: interviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch history",
    });
  }
};
