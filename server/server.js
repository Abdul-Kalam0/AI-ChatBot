import server from "./index.js";
import dotenv from "dotenv";
dotenv.config();
import dbInitializer from "./config/db.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  await dbInitializer();
  server.listen(PORT, () => {
    console.log(`Sever is listening on ${PORT}`);
  });
}

startServer();
