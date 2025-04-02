
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { companyService } from '@/lib/services';
import { Company } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';

export function useCompany() {
  const queryClient = useQueryClient();
  
  const companyQuery = useQuery({
    queryKey: ['company'],
    queryFn: companyService.getDetails,
  });
  
  const updateCompany = useMutation({
    mutationFn: (data: Partial<Company>) => companyService.updateDetails(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company'] });
      toast({
        title: 'Success',
        description: 'Company details updated successfully',
      });
    },
  });
  
  const uploadLogo = useMutation({
    mutationFn: (logoUrl: string) => companyService.uploadLogo(logoUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company'] });
      toast({
        title: 'Success',
        description: 'Company logo updated successfully',
      });
    },
  });
  
  return {
    company: companyQuery.data,
    isLoading: companyQuery.isLoading,
    isError: companyQuery.isError,
    error: companyQuery.error,
    updateCompany,
    uploadLogo,
  };
}
