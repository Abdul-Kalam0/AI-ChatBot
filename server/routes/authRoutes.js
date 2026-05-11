import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import { authRateLimiter } from "../middleware/authRateLimiter.js";
const router = express.Router();

router.post("/register", authRateLimiter, register);
router.post("/login", authRateLimiter, login);
router.post("/logout", authRateLimiter, logout);

export default router;
