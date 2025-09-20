import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

import express from "express";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import contentRoutes from "./routes/content.route.js";
import courseRoutes from "./routes/course.route.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
const DB_URL = process.env.atlas_URL;
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/course", courseRoutes);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: "Something went Wrong" });
});

mongoose
  .connect(DB_URL, { serverSelectionTimeoutMS: 5000, dbName: "theproject" })

  .then(() => console.log(" Connected to MongoDB Atlas"))
  .catch((err) => console.error(" Failed to connect:", err));

const PORT = parseInt(process.env.PORT) || 5051;

app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 App listening on port ${PORT}`)
);
