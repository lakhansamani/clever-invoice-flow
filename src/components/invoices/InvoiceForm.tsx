
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Invoice, Customer, InvoiceStatus } from "@/lib/types";
import { Trash, Plus } from "lucide-react";
import { format } from "date-fns";

// Define form schema with zod
const invoiceItemSchema = z.object({
  description: z.string().min(2, "Description must be at least 2 characters."),
  quantity: z.coerce.number().positive("Quantity must be positive."),
  unitPrice: z.coerce.number().positive("Unit price must be positive."),
  taxRate: z.coerce.number().min(0, "Tax rate cannot be negative.").optional(),
});

const invoiceSchema = z.object({
  customerId: z.string().min(1, "Please select a customer."),
  number: z.string().min(1, "Invoice number is required."),
  date: z.string().min(1, "Issue date is required."),
  dueDate: z.string().min(1, "Due date is required."),
  status: z.enum(["draft", "pending", "paid", "overdue", "cancelled"]),
  items: z.array(invoiceItemSchema).min(1, "Add at least one item to the invoice."),
  notes: z.string().optional(),
  termsAndConditions: z.string().optional(),
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

interface InvoiceFormProps {
  initialData?: Invoice;
  customers: Customer[];
  onSubmit: (data: InvoiceFormValues) => void;
  onCancel: () => void;
}

export function InvoiceForm({ initialData, customers, onSubmit, onCancel }: InvoiceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Set up form with resolver and default values
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: initialData || {
      customerId: "",
      number: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      date: format(new Date(), "yyyy-MM-dd"),
      dueDate: format(new Date(new Date().setDate(new Date().getDate() + 30)), "yyyy-MM-dd"),
      status: "draft",
      items: [
        { 
          description: "", 
          quantity: 1, 
          unitPrice: 0,
          taxRate: 0 
        }
      ],
      notes: "",
      termsAndConditions: "Payment is due within 30 days from the date of invoice.",
    },
  });

  // Use field array for invoice items
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  // Calculate totals
  const items = form.watch("items");
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.quantity || 0) * (item.unitPrice || 0);
  }, 0);
  
  const taxTotal = items.reduce((sum, item) => {
    const itemTotal = (item.quantity || 0) * (item.unitPrice || 0);
    const taxRate = item.taxRate || 0;
    return sum + (itemTotal * (taxRate / 100));
  }, 0);
  
  const total = subtotal + taxTotal;

  const handleSubmit = async (data: InvoiceFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      toast({
        title: initialData ? "Invoice updated" : "Invoice created",
        description: initialData 
          ? `Invoice #${data.number} has been updated.`
          : `Invoice #${data.number} has been created.`,
      });
    } catch (error) {
      console.error("Error submitting invoice form:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "There was a problem saving the invoice. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Customer */}
          <FormField
            control={form.control}
            name="customerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name} {customer.companyName ? `(${customer.companyName})` : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Invoice Number */}
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Issue Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issue Date</FormLabel>
                <FormControl>
                  <Input type="date" max={today} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Due Date */}
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input type="date" min={form.watch('date')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Invoice Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Invoice Items</h3>
          </div>
          
          {/* Item Headers */}
          <div className="grid grid-cols-12 gap-4 mb-2 text-sm font-medium text-muted-foreground">
            <div className="col-span-5">Description</div>
            <div className="col-span-2 text-right">Quantity</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">Tax %</div>
            <div className="col-span-1"></div>
          </div>
          
          {/* Item Rows */}
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-5">
                  <FormField
                    control={form.control}
                    name={`items.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Item description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name={`items.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1" 
                            step="1" 
                            className="text-right" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name={`items.${index}.unitPrice`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="0" 
                            step="0.01" 
                            className="text-right" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name={`items.${index}.taxRate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="0" 
                            step="0.1" 
                            className="text-right" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="col-span-1 flex justify-end">
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ description: "", quantity: 1, unitPrice: 0, taxRate: 0 })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
          
          {/* Totals */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-end space-y-2">
              <div className="w-72 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tax</span>
                  <span>${taxTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notes */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter any notes for this invoice..." 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>These notes will be visible to the customer.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Terms and Conditions */}
          <FormField
            control={form.control}
            name="termsAndConditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Terms and Conditions</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter your terms and conditions..." 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>Standard terms that will appear at the bottom of the invoice.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : initialData ? 'Update Invoice' : 'Create Invoice'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default InvoiceForm;
