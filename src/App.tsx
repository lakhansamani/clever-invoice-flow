
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

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

// Create Auth Context
import { createContext } from "react";
import { User } from "./lib/types";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
});

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Private route component
  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    if (isLoading) return <div>Loading...</div>;
    return user ? <>{children}</> : <Navigate to="/login" />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, setUser, isLoading }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
