import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { InvoiceForm } from "@/components/invoices/InvoiceForm";
import { Customer } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function InvoiceFormPage() {
  const navigate = useNavigate();
  
  // Mock customer data for the form
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
  
  const handleSubmit = async (data: any) => {
    // Here we would typically save to the database via Supabase
    console.log("Invoice data to save:", data);
    
    // For now, just navigate back to invoices page after a short delay
    // to simulate saving
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
        navigate("/invoices");
      }, 1000);
    });
  };
  
  const handleCancel = () => {
    navigate("/invoices");
  };
  
  return (
    <AppLayout>
      <div className="page-container">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/invoices")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">New Invoice</h1>
            <p className="text-muted-foreground">Create a new invoice</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <InvoiceForm 
            customers={customers}
            onSubmit={handleSubmit} 
            onCancel={handleCancel} 
          />
        </div>
      </div>
    </AppLayout>
  );
}
