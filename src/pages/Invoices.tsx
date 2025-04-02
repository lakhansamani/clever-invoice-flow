
import { AppLayout } from "@/components/layout/AppLayout";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { Invoice } from "@/lib/types";

export default function Invoices() {
  // Mock data
  const invoices: Invoice[] = [
    {
      id: "1",
      companyId: "comp1",
      customerId: "cust1",
      customerName: "Acme Corporation",
      customerEmail: "billing@acme.com",
      number: "INV-2023-001",
      date: "2023-10-15",
      dueDate: "2023-11-15",
      status: "paid",
      total: 2500,
      currency: "USD",
      createdAt: "2023-10-15T10:00:00Z",
      updatedAt: "2023-10-20T14:30:00Z",
    },
    {
      id: "2",
      companyId: "comp1",
      customerId: "cust2",
      customerName: "Globex Industries",
      customerEmail: "accounts@globex.com",
      number: "INV-2023-002",
      date: "2023-10-18",
      dueDate: "2023-11-18",
      status: "pending",
      total: 1850,
      currency: "USD",
      createdAt: "2023-10-18T11:15:00Z",
      updatedAt: "2023-10-18T11:15:00Z",
    },
    {
      id: "3",
      companyId: "comp1",
      customerId: "cust3",
      customerName: "Initech LLC",
      customerEmail: "finance@initech.com",
      number: "INV-2023-003",
      date: "2023-10-05",
      dueDate: "2023-11-05",
      status: "overdue",
      total: 3200,
      currency: "USD",
      createdAt: "2023-10-05T09:30:00Z",
      updatedAt: "2023-10-05T09:30:00Z",
    },
    {
      id: "4",
      companyId: "comp1",
      customerId: "cust4",
      customerName: "Stark Industries",
      customerEmail: "accounting@stark.com",
      number: "INV-2023-004",
      date: "2023-10-22",
      dueDate: "2023-11-22",
      status: "draft",
      total: 4750,
      currency: "USD",
      createdAt: "2023-10-22T15:45:00Z",
      updatedAt: "2023-10-22T15:45:00Z",
    },
    {
      id: "5",
      companyId: "comp1",
      customerId: "cust5",
      customerName: "Umbrella Corp",
      customerEmail: "finance@umbrella.co.uk",
      number: "INV-2023-005",
      date: "2023-10-25",
      dueDate: "2023-11-25",
      status: "paid",
      total: 5600,
      currency: "GBP",
      createdAt: "2023-10-25T13:20:00Z",
      updatedAt: "2023-10-30T09:15:00Z",
    },
    {
      id: "6",
      companyId: "comp1",
      customerId: "cust1",
      customerName: "Acme Corporation",
      customerEmail: "billing@acme.com",
      number: "INV-2023-006",
      date: "2023-11-01",
      dueDate: "2023-12-01",
      status: "pending",
      total: 3750,
      currency: "USD",
      createdAt: "2023-11-01T10:30:00Z",
      updatedAt: "2023-11-01T10:30:00Z",
    },
  ];

  return (
    <AppLayout>
      <div className="page-container">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-muted-foreground">Manage your invoices</p>
        </div>
        
        <InvoiceTable invoices={invoices} />
      </div>
    </AppLayout>
  );
}
