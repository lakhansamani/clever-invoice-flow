
export type User = {
  id: string;
  email: string;
  name: string;
  companyId: string;
  createdAt: string;
  role: "admin" | "user";
};

export type Company = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
};

export type Customer = {
  id: string;
  companyId: string;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
  companyName?: string;
  taxId?: string;
  currency: string;
};

export type InvoiceStatus = "draft" | "pending" | "paid" | "overdue" | "cancelled";

export type Invoice = {
  id: string;
  companyId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  number: string;
  date: string;
  dueDate: string;
  status: InvoiceStatus;
  total: number;
  currency: string;
  notes?: string;
  termsAndConditions?: string;
  createdAt: string;
  updatedAt: string;
};

export type InvoiceItem = {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  taxRate?: number;
  taxAmount?: number;
};

export type Stats = {
  totalInvoices: number;
  paidInvoices: number;
  pendingInvoices: number;
  overdueInvoices: number;
  totalRevenue: number;
  currency: string;
};
