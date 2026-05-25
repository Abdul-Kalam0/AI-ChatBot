import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import interviewRoutes from "./routes/interviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173",
    //origin: "https://interviewmock-001.vercel.app",
    credentials: true,
  }),
);

//Auth Route
app.use("/api/auth", authRoutes);

// Interview Route
app.use("/api/interview", interviewRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "InterviewMock backend running",
  });
});

export default app;
