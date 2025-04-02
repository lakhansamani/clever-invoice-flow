
import api from '../api';
import { Invoice, InvoiceItem, Stats } from '../types';

interface InvoiceWithItems extends Invoice {
  items: InvoiceItem[];
}

export const invoiceService = {
  async getAll(): Promise<Invoice[]> {
    const response = await api.get<Invoice[]>('/invoices');
    return response.data;
  },
  
  async getById(id: string): Promise<InvoiceWithItems> {
    const response = await api.get<InvoiceWithItems>(`/invoices/${id}`);
    return response.data;
  },
  
  async create(data: Partial<InvoiceWithItems>): Promise<InvoiceWithItems> {
    const response = await api.post<InvoiceWithItems>('/invoices', data);
    return response.data;
  },
  
  async update(id: string, data: Partial<InvoiceWithItems>): Promise<InvoiceWithItems> {
    const response = await api.put<InvoiceWithItems>(`/invoices/${id}`, data);
    return response.data;
  },
  
  async delete(id: string): Promise<void> {
    await api.delete(`/invoices/${id}`);
  },
  
  async getStats(): Promise<Stats> {
    const response = await api.get<Stats>('/invoices/stats/overview');
    return response.data;
  }
};
