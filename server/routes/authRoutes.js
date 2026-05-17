import express from "express";
import {
  googleLogin,
  login,
  logout,
  me,
  register,
} from "../controllers/authController.js";
import { authRateLimiter } from "../middleware/authRateLimiter.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", authRateLimiter, register);
router.post("/login", authRateLimiter, login);
router.post("/google", googleLogin);
router.post("/logout", authRateLimiter, logout);
router.get("/me", authMiddleware, me);

export default router;
