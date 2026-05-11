import express from "express";
const router = express.Router();

import {
  answerQuestion,
  feedbackSummary,
  startInterview,
} from "../controllers/interviewController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

router.post("/start", authMiddleware, startInterview);

router.post("/answer", authMiddleware, answerQuestion);

router.get("/summary/:interviewId", authMiddleware, feedbackSummary);

export default router;
