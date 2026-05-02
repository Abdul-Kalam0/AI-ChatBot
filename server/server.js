import server from "./index.js";
import dbConnect from "./config/db.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await dbConnect();

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
