
import { LoginForm } from "@/components/auth/LoginForm";
import { FileInvoice } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="mb-8 text-center">
        <Link to="/" className="inline-flex items-center space-x-2 text-primary">
          <FileInvoice className="h-6 w-6" />
          <span className="text-2xl font-bold">InvoicePro</span>
        </Link>
      </div>
      <LoginForm />
    </div>
  );
}
