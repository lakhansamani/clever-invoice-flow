
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import CustomerForm from "./pages/CustomerForm";
import Invoices from "./pages/Invoices";
import InvoiceForm from "./pages/InvoiceForm";
import NotFound from "./pages/NotFound";

// Auth Provider
import { AuthProvider, useAuth } from "./hooks/use-auth-context";

const queryClient = new QueryClient();

// Private route component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  return user ? <>{children}</> : <Navigate to="/login" />;
};

// App router component
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/customers" 
        element={
          <PrivateRoute>
            <Customers />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/customers/new" 
        element={
          <PrivateRoute>
            <CustomerForm />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/customers/edit/:id" 
        element={
          <PrivateRoute>
            <CustomerForm />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/invoices" 
        element={
          <PrivateRoute>
            <Invoices />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/invoices/new" 
        element={
          <PrivateRoute>
            <InvoiceForm />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/invoices/edit/:id" 
        element={
          <PrivateRoute>
            <InvoiceForm />
          </PrivateRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRouter />
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
