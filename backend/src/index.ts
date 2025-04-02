
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import customerRoutes from './routes/customers';
import invoiceRoutes from './routes/invoices';
import companyRoutes from './routes/companies';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/companies', companyRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Invoicing SaaS API is running!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
