import express from "express";
import cors from "cors";
import inquiryRouter from "../apis/v1/inquiry.js";
import authRouter from "../apis/v1/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:4200",
  credentials: true
}));

// Body parsing middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use("/api/v1", authRouter);
app.use("/api/v1", inquiryRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
