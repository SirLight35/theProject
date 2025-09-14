import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
// import contentRoutes from "./routes/content.js  ";

dotenv.config();
const app = express();
app.use(express.json());

const DB_URL = process.env.atlas_URL;
const PORT = process.env.PORT;
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/content", contentRoutes);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: "Something went Wrong" });
});
app.get("/", (req, res) => {
  res.send("🚀 Hello from Express & Mongo!");
});
mongoose
  .connect(DB_URL, { serverSelectionTimeoutMS: 5000, dbName: "theproject" })

  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ Failed to connect:", err));

app.listen(5050, () => console.log(`🚀 App listening on port 5050`));
