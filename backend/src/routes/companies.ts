
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get company details
router.get('/', authenticate, async (req, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: { id: req.user!.companyId },
    });

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ message: 'Failed to fetch company details' });
  }
});

// Update company details (admin only)
router.put('/', authenticate, async (req, res) => {
  try {
    const { name, address, phone, email, website } = req.body;

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
    });

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admin only' });
    }

    const company = await prisma.company.update({
      where: { id: req.user!.companyId },
      data: {
        name,
        address,
        phone,
        email,
        website,
      },
    });

    res.json(company);
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ message: 'Failed to update company details' });
  }
});

// Upload company logo (admin only)
router.post('/logo', authenticate, async (req, res) => {
  try {
    // Note: In a real implementation, you would handle file upload here
    // using something like multer and store the file in a cloud storage
    // For simplicity, we'll just update the logo URL here
    const { logoUrl } = req.body;

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
    });

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admin only' });
    }

    const company = await prisma.company.update({
      where: { id: req.user!.companyId },
      data: {
        logo: logoUrl,
      },
    });

    res.json(company);
  } catch (error) {
    console.error('Error updating company logo:', error);
    res.status(500).json({ message: 'Failed to update company logo' });
  }
});

export default router;
