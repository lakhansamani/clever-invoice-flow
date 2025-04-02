
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/lib/services';
import { User } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';

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

export function useUsers() {
  const queryClient = useQueryClient();
  
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  });
  
  const createUser = useMutation({
    mutationFn: (data: CreateUserData) => userService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'Success',
        description: 'User created successfully',
      });
    },
  });
  
  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    error: usersQuery.error,
    createUser,
  };
}

export function useProfile() {
  const queryClient = useQueryClient();
  
  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: userService.getProfile,
  });
  
  const updateProfile = useMutation({
    mutationFn: (data: UpdateProfileData) => userService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    },
  });
  
  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    error: profileQuery.error,
    updateProfile,
  };
}
