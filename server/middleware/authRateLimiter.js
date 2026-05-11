import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 15, // limit each IP to 5 requests

  message: {
    success: false,
    message: "Too many requests, please try again later",
  },

  standardHeaders: true,
  legacyHeaders: false,
});
