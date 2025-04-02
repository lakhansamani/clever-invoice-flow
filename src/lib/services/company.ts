
import api from '../api';
import { Company } from '../types';

export const companyService = {
  async getDetails(): Promise<Company> {
    const response = await api.get<Company>('/companies');
    return response.data;
  },
  
  async updateDetails(data: Partial<Company>): Promise<Company> {
    const response = await api.put<Company>('/companies', data);
    return response.data;
  },
  
  async uploadLogo(logoUrl: string): Promise<Company> {
    const response = await api.post<Company>('/companies/logo', { logoUrl });
    return response.data;
  }
};
