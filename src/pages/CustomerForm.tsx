
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { CustomerForm } from "@/components/customers/CustomerForm";
import { Customer } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CustomerFormPage() {
  const navigate = useNavigate();
  
  const handleSubmit = async (data: any) => {
    // Here we would typically save to the database via Supabase
    console.log("Customer data to save:", data);
    
    // For now, just navigate back to customers page after a short delay
    // to simulate saving
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
        navigate("/customers");
      }, 1000);
    });
  };
  
  const handleCancel = () => {
    navigate("/customers");
  };
  
  return (
    <AppLayout>
      <div className="page-container">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/customers")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">New Customer</h1>
            <p className="text-muted-foreground">Add a new customer to your account</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <CustomerForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
      </div>
    </AppLayout>
  );
}
