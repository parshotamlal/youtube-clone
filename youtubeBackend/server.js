import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ConnectDb } from "./dbConnection/Connect.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to YouTube Backend API" });
});
//  Routes
import authRouter from "./routes/authRoutes.js";
app.use("/user", authRouter);

// Start server function
const startServer = async () => {
  try {
    // Connect to database
    await ConnectDb();

    // Start listening
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection:", err);
  process.exit(1);
});

// Start the server
startServer();
