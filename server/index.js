import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// CORS setup
app.use(
  cors({
    credentials: true,
  }),
);

// MongoDB Session Store
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: "sessions",
      ttl: 60 * 60 * 24, // 1 day
    }),
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 30, // 30 minutes
    },
  }),
);

// Routes
app.use("/api", chatRoutes);

app.get("/", (req, res) => {
  res.json("PrepAI is backend running✅");
});

export default app;
