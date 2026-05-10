import mongoose from "mongoose";
import Interview from "../models/interviewModel.js";
import Message from "../models/messageModel.js";

import { generateAIResponse } from "../services/aiService.js";

import { generateInterviewFeedback } from "../services/feedbackService.js";

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
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
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
    if (!interviewId || !answer?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Interview ID and answer are required",
      });
    }

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

      content: answer,

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
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
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
  } catch (error) {}
};
