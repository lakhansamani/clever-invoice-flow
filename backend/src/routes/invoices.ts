
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all invoices for the company
router.get('/', authenticate, async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      where: { companyId: req.user!.companyId },
      include: {
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ message: 'Failed to fetch invoices' });
  }
});

// Get invoice by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await prisma.invoice.findFirst({
      where: {
        id,
        companyId: req.user!.companyId,
      },
      include: {
        customer: true,
        items: true,
      },
    });

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.json(invoice);
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ message: 'Failed to fetch invoice' });
  }
});

// Create a new invoice
router.post('/', authenticate, async (req, res) => {
  try {
    const {
      customerId,
      number,
      date,
      dueDate,
      status,
      total,
      currency,
      notes,
      termsAndConditions,
      items,
    } = req.body;

    // Check if customer exists and belongs to the company
    const customer = await prisma.customer.findFirst({
      where: {
        id: customerId,
        companyId: req.user!.companyId,
      },
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Check if invoice number is unique for this company
    const existingInvoice = await prisma.invoice.findFirst({
      where: {
        companyId: req.user!.companyId,
        number,
      },
    });

    if (existingInvoice) {
      return res
        .status(400)
        .json({ message: 'An invoice with this number already exists' });
    }

    // Create invoice with items
    const invoice = await prisma.invoice.create({
      data: {
        number,
        date: new Date(date),
        dueDate: new Date(dueDate),
        status,
        total,
        currency,
        notes,
        termsAndConditions,
        customerId,
        companyId: req.user!.companyId,
        items: {
          create: items.map((item: any) => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            amount: item.amount,
            taxRate: item.taxRate,
            taxAmount: item.taxAmount,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json(invoice);
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ message: 'Failed to create invoice' });
  }
});

// Update an invoice
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      customerId,
      number,
      date,
      dueDate,
      status,
      total,
      currency,
      notes,
      termsAndConditions,
      items,
    } = req.body;

    // Check if invoice exists and belongs to the company
    const existingInvoice = await prisma.invoice.findFirst({
      where: {
        id,
        companyId: req.user!.companyId,
      },
    });

    if (!existingInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Check if customer exists and belongs to the company
    const customer = await prisma.customer.findFirst({
      where: {
        id: customerId,
        companyId: req.user!.companyId,
      },
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Check if invoice number is being changed and if it's unique
    if (number !== existingInvoice.number) {
      const numberInUse = await prisma.invoice.findFirst({
        where: {
          companyId: req.user!.companyId,
          number,
          NOT: { id },
        },
      });

      if (numberInUse) {
        return res
          .status(400)
          .json({ message: 'An invoice with this number already exists' });
      }
    }

    // Update invoice in a transaction
    const updatedInvoice = await prisma.$transaction(async (prisma) => {
      // Delete existing items
      await prisma.invoiceItem.deleteMany({
        where: { invoiceId: id },
      });

      // Update invoice with new data
      const updated = await prisma.invoice.update({
        where: { id },
        data: {
          number,
          date: new Date(date),
          dueDate: new Date(dueDate),
          status,
          total,
          currency,
          notes,
          termsAndConditions,
          customerId,
          items: {
            create: items.map((item: any) => ({
              description: item.description,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              amount: item.amount,
              taxRate: item.taxRate,
              taxAmount: item.taxAmount,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      return updated;
    });

    res.json(updatedInvoice);
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ message: 'Failed to update invoice' });
  }
});

// Delete an invoice
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if invoice exists and belongs to the company
    const invoice = await prisma.invoice.findFirst({
      where: {
        id,
        companyId: req.user!.companyId,
      },
    });

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Delete invoice (items are automatically deleted due to cascade)
    await prisma.invoice.delete({
      where: { id },
    });

    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ message: 'Failed to delete invoice' });
  }
});

// Get invoice statistics
router.get('/stats/overview', authenticate, async (req, res) => {
  try {
    // Get total count of invoices
    const totalInvoices = await prisma.invoice.count({
      where: { companyId: req.user!.companyId },
    });

    // Count invoices by status
    const paidInvoices = await prisma.invoice.count({
      where: { 
        companyId: req.user!.companyId,
        status: 'paid' 
      },
    });

    const pendingInvoices = await prisma.invoice.count({
      where: { 
        companyId: req.user!.companyId,
        status: 'pending' 
      },
    });

    const overdueInvoices = await prisma.invoice.count({
      where: { 
        companyId: req.user!.companyId,
        status: 'overdue' 
      },
    });

    // Calculate total revenue (sum of paid invoices)
    const revenueSums = await prisma.invoice.groupBy({
      by: ['currency'],
      where: {
        companyId: req.user!.companyId,
        status: 'paid',
      },
      _sum: {
        total: true,
      },
    });

    // Format the revenue data
    const revenues = revenueSums.map(item => ({
      currency: item.currency,
      amount: item._sum.total || 0
    }));

    // Get primary currency (most used)
    const primaryCurrency = await prisma.invoice.groupBy({
      by: ['currency'],
      where: { companyId: req.user!.companyId },
      _count: true,
      orderBy: {
        _count: {
          currency: 'desc',
        },
      },
      take: 1,
    });

    const defaultCurrency = primaryCurrency.length > 0 ? primaryCurrency[0].currency : 'USD';

    res.json({
      totalInvoices,
      paidInvoices,
      pendingInvoices,
      overdueInvoices,
      revenues,
      currency: defaultCurrency,
    });
  } catch (error) {
    console.error('Error fetching invoice stats:', error);
    res.status(500).json({ message: 'Failed to fetch invoice statistics' });
  }
});

export default router;
