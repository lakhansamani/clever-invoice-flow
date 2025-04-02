
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all customers for the company
router.get('/', authenticate, async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      where: { companyId: req.user!.companyId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
});

// Get a single customer by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customer.findFirst({
      where: {
        id,
        companyId: req.user!.companyId,
      },
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ message: 'Failed to fetch customer' });
  }
});

// Create a new customer
router.post('/', authenticate, async (req, res) => {
  try {
    const {
      name,
      email,
      companyName,
      address,
      city,
      state,
      zip,
      country,
      phone,
      taxId,
      currency,
    } = req.body;

    // Check if customer with this email already exists for this company
    const existingCustomer = await prisma.customer.findFirst({
      where: {
        companyId: req.user!.companyId,
        email,
      },
    });

    if (existingCustomer) {
      return res
        .status(400)
        .json({ message: 'A customer with this email already exists' });
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        companyName,
        address,
        city,
        state,
        zip,
        country,
        phone,
        taxId,
        currency,
        companyId: req.user!.companyId,
      },
    });

    res.status(201).json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ message: 'Failed to create customer' });
  }
});

// Update a customer
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      companyName,
      address,
      city,
      state,
      zip,
      country,
      phone,
      taxId,
      currency,
    } = req.body;

    // Check if customer exists and belongs to the user's company
    const existingCustomer = await prisma.customer.findFirst({
      where: {
        id,
        companyId: req.user!.companyId,
      },
    });

    if (!existingCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Check if email is being changed and if it's already in use
    if (email !== existingCustomer.email) {
      const emailInUse = await prisma.customer.findFirst({
        where: {
          companyId: req.user!.companyId,
          email,
          NOT: { id },
        },
      });

      if (emailInUse) {
        return res
          .status(400)
          .json({ message: 'A customer with this email already exists' });
      }
    }

    const customer = await prisma.customer.update({
      where: { id },
      data: {
        name,
        email,
        companyName,
        address,
        city,
        state,
        zip,
        country,
        phone,
        taxId,
        currency,
      },
    });

    res.json(customer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ message: 'Failed to update customer' });
  }
});

// Delete a customer
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if customer exists and belongs to the user's company
    const customer = await prisma.customer.findFirst({
      where: {
        id,
        companyId: req.user!.companyId,
      },
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Check if customer has invoices
    const invoiceCount = await prisma.invoice.count({
      where: { customerId: id },
    });

    if (invoiceCount > 0) {
      return res.status(400).json({
        message: 'Cannot delete customer with associated invoices',
      });
    }

    await prisma.customer.delete({
      where: { id },
    });

    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ message: 'Failed to delete customer' });
  }
});

export default router;
