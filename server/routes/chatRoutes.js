import express from "express";
import {
  handleChat,
  getSessionHistory,
  clearSession,
} from "../controllers/chatControllers.js";

const router = express.Router();

router.post("/chat", handleChat);
router.get("/chat/history", getSessionHistory);
router.post("/clear-session", clearSession);

export default router;
