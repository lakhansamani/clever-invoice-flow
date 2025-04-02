
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Customer } from "@/lib/types";

// Define form schema with zod
const customerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  companyName: z.string().optional(),
  address: z.string().min(5, "Address must be at least 5 characters."),
  city: z.string().min(2, "City must be at least 2 characters."),
  state: z.string().optional(),
  zip: z.string().min(3, "ZIP/Postal code must be at least 3 characters."),
  country: z.string().min(2, "Country must be at least 2 characters."),
  phone: z.string().optional(),
  taxId: z.string().optional(),
  currency: z.string().min(3, "Currency must be a valid 3-letter code."),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

interface CustomerFormProps {
  initialData?: Customer;
  onSubmit: (data: CustomerFormValues) => void;
  onCancel: () => void;
}

const currencies = [
  { label: "US Dollar", value: "USD" },
  { label: "Euro", value: "EUR" },
  { label: "British Pound", value: "GBP" },
  { label: "Japanese Yen", value: "JPY" },
  { label: "Canadian Dollar", value: "CAD" },
  { label: "Australian Dollar", value: "AUD" },
  { label: "Swiss Franc", value: "CHF" },
  { label: "Chinese Yuan", value: "CNY" },
  { label: "Indian Rupee", value: "INR" },
  { label: "Brazilian Real", value: "BRL" },
];

export function CustomerForm({ initialData, onSubmit, onCancel }: CustomerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Set up form with resolver and default values
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      companyName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      phone: "",
      taxId: "",
      currency: "USD",
    },
  });

  const handleSubmit = async (data: CustomerFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      toast({
        title: initialData ? "Customer updated" : "Customer created",
        description: initialData 
          ? `${data.name}'s information has been updated.`
          : `${data.name} has been added as a customer.`,
      });
    } catch (error) {
      console.error("Error submitting customer form:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "There was a problem saving the customer. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="customer@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Corporation" {...field} />
                </FormControl>
                <FormDescription>Optional if customer is an individual</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="123 Business Way, Suite 100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="San Francisco" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* State/Province */}
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State/Province</FormLabel>
                <FormControl>
                  <Input placeholder="CA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* ZIP/Postal Code */}
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ZIP/Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="94105" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="USA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Tax ID */}
          <FormField
            control={form.control}
            name="taxId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax ID/VAT Number</FormLabel>
                <FormControl>
                  <Input placeholder="123456789" {...field} />
                </FormControl>
                <FormDescription>Optional tax identification number</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Currency */}
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label} ({currency.value})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            {isSubmitting ? 'Saving...' : initialData ? 'Update Customer' : 'Create Customer'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CustomerForm;
