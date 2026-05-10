import express from "express";
const router = express.Router();

import {
  answerQuestion,
  feedbackSummary,
  startInterview,
} from "../controllers/interviewController.js";

router.post("/start", startInterview);

router.post("/answer", answerQuestion);

router.get("/summary/:interviewId", feedbackSummary);

export default router;
