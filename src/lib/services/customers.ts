
import api from '../api';
import { Customer } from '../types';

export const customerService = {
  async getAll(): Promise<Customer[]> {
    const response = await api.get<Customer[]>('/customers');
    return response.data;
  },
  
  async getById(id: string): Promise<Customer> {
    const response = await api.get<Customer>(`/customers/${id}`);
    return response.data;
  },
  
  async create(data: Partial<Customer>): Promise<Customer> {
    const response = await api.post<Customer>('/customers', data);
    return response.data;
  },
  
  async update(id: string, data: Partial<Customer>): Promise<Customer> {
    const response = await api.put<Customer>(`/customers/${id}`, data);
    return response.data;
  },
  
  async delete(id: string): Promise<void> {
    await api.delete(`/customers/${id}`);
  }
};
