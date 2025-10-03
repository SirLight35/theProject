import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import express from "express";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import contentRoutes from "./routes/content.route.js";
import courseRoutes from "./routes/course.route.js";

const app = express();

// Enable CORS for frontend at port 5173
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/course", courseRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: "Something went Wrong" });
});

// DB connection
const DB_URL = process.env.atlas_URL;
mongoose
  .connect(DB_URL, { serverSelectionTimeoutMS: 5000, dbName: "theproject" })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ Failed to connect:", err));

// Server
const PORT = parseInt(process.env.PORT) || 5051;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 App listening on port ${PORT}`)
);
