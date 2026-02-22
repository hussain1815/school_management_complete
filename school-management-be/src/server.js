import 'dotenv/config';
import express from "express";
import cors from "cors";
import path from "path";
import inquiryRouter from "../apis/v1/inquiry.js";
import authRouter from "../apis/v1/auth.js";
import newsRouter from "../apis/v1/news.js";
import galleryRouter from "../apis/v1/gallery.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
const allowedOrigins = [
  process.env.CORS_ORIGIN || "http://localhost",
  "http://localhost:4200",
  "http://localhost:80",
  "https://be.sunflowerskg.com",
  "https://sunflowerskg.com"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Body parsing middleware
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

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
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/gallery", galleryRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
