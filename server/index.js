import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
import chatRoutes from "./routes/chatRoutes.js";

app.use(express.json());
app.use(
  cors({
    origin: "https://ai-chatbot001.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api", chatRoutes);

export default app;
