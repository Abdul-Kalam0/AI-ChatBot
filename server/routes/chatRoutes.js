import express from "express";
const router = express.Router();
import { handleChat } from "../controllers/chatControllers.js";

router.post("/chat", handleChat);

export default router;
