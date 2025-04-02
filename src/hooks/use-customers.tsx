
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerService } from '@/lib/services';
import { Customer } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';

export function useCustomers() {
  const queryClient = useQueryClient();
  
  const customersQuery = useQuery({
    queryKey: ['customers'],
    queryFn: customerService.getAll,
  });
  
  const createCustomer = useMutation({
    mutationFn: (data: Partial<Customer>) => customerService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({
        title: 'Success',
        description: 'Customer created successfully',
      });
    },
  });
  
  const updateCustomer = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Customer> }) => 
      customerService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({
        title: 'Success',
        description: 'Customer updated successfully',
      });
    },
  });
  
  const deleteCustomer = useMutation({
    mutationFn: (id: string) => customerService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({
        title: 'Success',
        description: 'Customer deleted successfully',
      });
    },
  });
  
  return {
    customers: customersQuery.data || [],
    isLoading: customersQuery.isLoading,
    isError: customersQuery.isError,
    error: customersQuery.error,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
}

export function useCustomer(id?: string) {
  const enabled = !!id;
  
  const customerQuery = useQuery({
    queryKey: ['customers', id],
    queryFn: () => customerService.getById(id!),
    enabled,
  });
  
  return {
    customer: customerQuery.data,
    isLoading: customerQuery.isLoading,
    isError: customerQuery.isError,
    error: customerQuery.error,
  };
}
