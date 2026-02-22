import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../../src/middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads', 'gallery');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedExt = /jpeg|jpg|png|gif|webp/;
    const allowedMime = /image\/(jpeg|jpg|png|gif|webp)/;
    const ext = allowedExt.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedMime.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Only image files (jpg, png, gif, webp) are allowed'));
  }
});

// Get active gallery images (public) with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const [images, total] = await Promise.all([
      prisma.galleryImage.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
        skip,
        take: limit
      }),
      prisma.galleryImage.count({ where: { isActive: true } })
    ]);

    res.json({
      data: images,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
});

// Get all gallery images (admin)
router.get('/all', authenticateToken, async (req, res) => {
  try {
    const images = await prisma.galleryImage.findMany({ orderBy: { order: 'asc' } });
    res.json(images);
  } catch (error) {
    console.error('Error fetching all gallery images:', error);
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
});

// Upload gallery image (admin)
router.post('/', authenticateToken, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      }
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { title, isActive, order } = req.body;
    if (!req.file) return res.status(400).json({ error: 'Image file is required' });
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const imageUrl = `/uploads/gallery/${req.file.filename}`;
    const image = await prisma.galleryImage.create({
      data: {
        title,
        imageUrl,
        isActive: isActive !== undefined ? isActive === 'true' : true,
        order: order ? parseInt(order) : 0
      }
    });
    res.status(201).json(image);
  } catch (error) {
    console.error('Error creating gallery image:', error);
    res.status(500).json({ error: 'Failed to create gallery image' });
  }
});

// Update gallery image (admin)
router.put('/:id', authenticateToken, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      }
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, isActive, order } = req.body;
    const data = {};

    if (title !== undefined) data.title = title;
    if (isActive !== undefined) data.isActive = isActive === 'true';
    if (order !== undefined) data.order = parseInt(order);

    if (req.file) {
      // Delete old image file
      const existing = await prisma.galleryImage.findUnique({ where: { id: parseInt(id) } });
      if (existing) {
        const oldPath = path.join(process.cwd(), existing.imageUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      data.imageUrl = `/uploads/gallery/${req.file.filename}`;
    }

    const image = await prisma.galleryImage.update({ where: { id: parseInt(id) }, data });
    res.json(image);
  } catch (error) {
    console.error('Error updating gallery image:', error);
    res.status(500).json({ error: 'Failed to update gallery image' });
  }
});

// Delete gallery image (admin)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const image = await prisma.galleryImage.findUnique({ where: { id: parseInt(id) } });
    if (image) {
      const filePath = path.join(process.cwd(), image.imageUrl);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await prisma.galleryImage.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Gallery image deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    res.status(500).json({ error: 'Failed to delete gallery image' });
  }
});

export default router;
