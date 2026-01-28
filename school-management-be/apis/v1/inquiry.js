import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET all inquiries
router.get("/inquiries", async (req, res) => {
  try {
    const inquiries = await prisma.inquiry.findMany();
    res.json(inquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// POST a new inquiry
router.post("/inquiries", async (req, res) => {
  try {
    const { parent_name, child_age, email, inquiry_Message } = req.body;
    const inquiry = await prisma.inquiry.create({
      data: { parent_name, child_age, email, inquiry_Message },
    });
    res.json(inquiry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
