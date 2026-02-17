import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../../src/middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get all active news (public endpoint)
router.get('/', async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Get all news (admin only)
router.get('/all', authenticateToken, async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(news);
  } catch (error) {
    console.error('Error fetching all news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Create news (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { content, isActive, order } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const news = await prisma.news.create({
      data: {
        content,
        isActive: isActive !== undefined ? isActive : true,
        order: order || 0
      }
    });

    res.status(201).json(news);
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ error: 'Failed to create news' });
  }
});

// Update news (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { content, isActive, order } = req.body;

    const news = await prisma.news.update({
      where: { id: parseInt(id) },
      data: {
        ...(content !== undefined && { content }),
        ...(isActive !== undefined && { isActive }),
        ...(order !== undefined && { order })
      }
    });

    res.json(news);
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ error: 'Failed to update news' });
  }
});

// Delete news (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.news.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ error: 'Failed to delete news' });
  }
});

export default router;
