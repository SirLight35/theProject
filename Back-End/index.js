import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import express from "express";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import studentRoutes from "./routes/student.route.js";
import educatorRoutes from "./routes/educator.route.js";
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/educator", educatorRoutes);
app.use("/api/student", studentRoutes);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: "Something went Wrong" });
});

const DB_URL = process.env.atlas_URL;
mongoose
  .connect(DB_URL, { serverSelectionTimeoutMS: 5000, dbName: "theproject" })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ Failed to connect:", err));

const PORT = parseInt(process.env.PORT) || 5051;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 App listening on port ${PORT}`)
);
