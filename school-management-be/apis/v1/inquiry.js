import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET all inquiries
router.get("/inquiries", async (req, res) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(inquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
});

// GET a single inquiry by ID
router.get("/inquiries/:id", async (req, res) => {
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

// POST a new inquiry
router.post("/inquiries", async (req, res) => {
  try {
    const { parent_name, child_age, email, inquiry_Message } = req.body;
    
    // Basic validation
    if (!parent_name || !child_age || !email || !inquiry_Message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    const inquiry = await prisma.inquiry.create({
      data: { parent_name, child_age, email, inquiry_Message },
    });
    
    res.status(201).json({
      message: "Inquiry created successfully",
      data: inquiry
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create inquiry" });
  }
});

// PUT/UPDATE an inquiry by ID
router.put("/inquiries/:id", async (req, res) => {
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
    
    const updatedInquiry = await prisma.inquiry.update({
      where: { id: parseInt(id) },
      data: { parent_name, child_age, email, inquiry_Message },
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

// DELETE an inquiry by ID
router.delete("/inquiries/:id", async (req, res) => {
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
