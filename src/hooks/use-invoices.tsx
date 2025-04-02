
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoiceService } from '@/lib/services';
import { Invoice, InvoiceItem } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';

interface InvoiceWithItems extends Invoice {
  items: InvoiceItem[];
}

export function useInvoices() {
  const queryClient = useQueryClient();
  
  const invoicesQuery = useQuery({
    queryKey: ['invoices'],
    queryFn: invoiceService.getAll,
  });
  
  const createInvoice = useMutation({
    mutationFn: (data: Partial<InvoiceWithItems>) => invoiceService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast({
        title: 'Success',
        description: 'Invoice created successfully',
      });
    },
  });
  
  const updateInvoice = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InvoiceWithItems> }) => 
      invoiceService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast({
        title: 'Success',
        description: 'Invoice updated successfully',
      });
    },
  });
  
  const deleteInvoice = useMutation({
    mutationFn: (id: string) => invoiceService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast({
        title: 'Success',
        description: 'Invoice deleted successfully',
      });
    },
  });
  
  return {
    invoices: invoicesQuery.data || [],
    isLoading: invoicesQuery.isLoading,
    isError: invoicesQuery.isError,
    error: invoicesQuery.error,
    createInvoice,
    updateInvoice,
    deleteInvoice,
  };
}

export function useInvoice(id?: string) {
  const enabled = !!id;
  
  const invoiceQuery = useQuery({
    queryKey: ['invoices', id],
    queryFn: () => invoiceService.getById(id!),
    enabled,
  });
  
  return {
    invoice: invoiceQuery.data,
    isLoading: invoiceQuery.isLoading,
    isError: invoiceQuery.isError,
    error: invoiceQuery.error,
  };
}

export function useInvoiceStats() {
  const statsQuery = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: invoiceService.getStats,
  });
  
  return {
    stats: statsQuery.data,
    isLoading: statsQuery.isLoading,
    isError: statsQuery.isError,
    error: statsQuery.error,
  };
}
