import express from "express";
const router = express.Router();

import {
  answerQuestion,
  feedbackSummary,
  getHistory,
  startInterview,
} from "../controllers/interviewController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

router.post("/start", authMiddleware, startInterview);

router.post("/answer", authMiddleware, answerQuestion);

router.get("/summary/:interviewId", authMiddleware, feedbackSummary);

router.get("/history", authMiddleware, getHistory);

export default router;
