import express from "express";
const router = express.Router();

import {
  answerQuestion,
  startInterview,
} from "../controllers/interviewController.js";

router.post("/start", startInterview);

router.post("/answer", answerQuestion);

export default router;
