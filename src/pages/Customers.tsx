
import { AppLayout } from "@/components/layout/AppLayout";
import { CustomerTable } from "@/components/customers/CustomerTable";
import { Customer } from "@/lib/types";

export default function Customers() {
  // Mock data
  const customers: Customer[] = [
    {
      id: "1",
      companyId: "comp1",
      name: "John Smith",
      email: "john@acme.com",
      companyName: "Acme Corporation",
      address: "123 Business Way",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "USA",
      phone: "+1 555-1234",
      taxId: "123456789",
      currency: "USD",
    },
    {
      id: "2",
      companyId: "comp1",
      name: "Sarah Lee",
      email: "sarah@globex.com",
      companyName: "Globex Industries",
      address: "456 Corporate Drive",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
      phone: "+1 555-5678",
      taxId: "987654321",
      currency: "USD",
    },
    {
      id: "3",
      companyId: "comp1",
      name: "David Chen",
      email: "david@initech.com",
      companyName: "Initech LLC",
      address: "789 Tech Blvd",
      city: "Austin",
      state: "TX",
      zip: "78701",
      country: "USA",
      phone: "+1 555-8765",
      taxId: "456789123",
      currency: "USD",
    },
    {
      id: "4",
      companyId: "comp1",
      name: "Maria Rodriguez",
      email: "maria@stark.com",
      companyName: "Stark Industries",
      address: "1000 Innovation Road",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA",
      phone: "+1 555-4321",
      taxId: "789123456",
      currency: "USD",
    },
    {
      id: "5",
      companyId: "comp1",
      name: "James Wilson",
      email: "james@umbrella.co.uk",
      companyName: "Umbrella Corp",
      address: "15 Oxford Street",
      city: "London",
      state: "",
      zip: "W1D 2DH",
      country: "UK",
      phone: "+44 20 1234 5678",
      taxId: "GB123456789",
      currency: "GBP",
    },
  ];

  return (
    <AppLayout>
      <div className="page-container">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage your customer information</p>
        </div>
        
        <CustomerTable customers={customers} />
      </div>
    </AppLayout>
  );
}
