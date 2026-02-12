import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "../../src/middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

// Email validation helper
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// GET all inquiries (Protected - Admin only)
router.get("/inquiries", authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.inquiry.count()
    ]);

    res.json({
      data: inquiries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
});

// GET a single inquiry by ID (Protected - Admin only)
router.get("/inquiries/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = await prisma.inquiry.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!inquiry) {
      return res.status(404).json({ error: "Inquiry not found" });
    }
    
    res.json(inquiry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch inquiry" });
  }
});

// POST a new inquiry (Public - No authentication required)
router.post("/inquiries", async (req, res) => {
  try {
    const { parent_name, child_age, email, inquiry_Message } = req.body;
    
    // Validation
    if (!parent_name || !child_age || !email || !inquiry_Message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate child age - must be a positive number
    const age = parseInt(child_age);
    if (isNaN(age) || age <= 0) {
      return res.status(400).json({ error: "Child age must be a positive number" });
    }
    
    const inquiry = await prisma.inquiry.create({
      data: { 
        parent_name: parent_name.trim(), 
        child_age: age, 
        email: email.trim().toLowerCase(), 
        inquiry_Message: inquiry_Message.trim() 
      },
    });
    
    res.status(201).json({
      message: "Inquiry submitted successfully",
      data: inquiry
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create inquiry" });
  }
});

// PUT/UPDATE an inquiry by ID (Protected - Admin only)
router.put("/inquiries/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { parent_name, child_age, email, inquiry_Message } = req.body;
    
    // Check if inquiry exists
    const existingInquiry = await prisma.inquiry.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!existingInquiry) {
      return res.status(404).json({ error: "Inquiry not found" });
    }
    
    // Basic validation
    if (!parent_name || !child_age || !email || !inquiry_Message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    
    const updatedInquiry = await prisma.inquiry.update({
      where: { id: parseInt(id) },
      data: { parent_name, child_age: parseInt(child_age), email, inquiry_Message },
    });
    
    res.json({
      message: "Inquiry updated successfully",
      data: updatedInquiry
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update inquiry" });
  }
});

// DELETE an inquiry by ID (Protected - Admin only)
router.delete("/inquiries/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if inquiry exists
    const existingInquiry = await prisma.inquiry.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!existingInquiry) {
      return res.status(404).json({ error: "Inquiry not found" });
    }
    
    await prisma.inquiry.delete({
      where: { id: parseInt(id) },
    });
    
    res.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete inquiry" });
  }
});

export default router;
