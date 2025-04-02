
import api from '../api';
import { User } from '../types';

interface UserProfile extends User {
  company?: {
    name: string;
  };
}

interface UpdateProfileData {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

export const userService = {
  async getAll(): Promise<User[]> {
    const response = await api.get<User[]>('/users');
    return response.data;
  },
  
  async getProfile(): Promise<UserProfile> {
    const response = await api.get<UserProfile>('/users/me');
    return response.data;
  },
  
  async updateProfile(data: UpdateProfileData): Promise<User> {
    const response = await api.put<User>('/users/me', data);
    return response.data;
  },
  
  async createUser(data: CreateUserData): Promise<User> {
    const response = await api.post<User>('/users', data);
    return response.data;
  }
};
