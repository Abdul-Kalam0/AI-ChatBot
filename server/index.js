import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import interviewRoutes from "./routes/interviewRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// CORS setup
app.use(cors());

// Routes
app.use("/api/interview", interviewRoutes);


app.get("/", (req, res) => {
  res.send("<h1>InterviewMock backend running✅</h1>");
});

export default app;
