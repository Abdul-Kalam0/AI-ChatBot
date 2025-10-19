import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function dbInitializer() {
  await mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("Connected to the DB"))
    .catch((error) => console.error("Error in connecting DB", error.message));
}

export default dbInitializer;
