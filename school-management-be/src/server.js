import express from "express";
import inquiryRouter from "../apis/v1/inquiry.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Use the inquiry API
app.use("/api/v1", inquiryRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
