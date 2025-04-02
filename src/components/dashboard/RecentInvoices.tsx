
import { Link } from "react-router-dom";
import { Invoice } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecentInvoicesProps {
  invoices: Invoice[];
}

export function RecentInvoices({ invoices }: RecentInvoicesProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "invoice-status-paid";
      case "pending": return "invoice-status-pending";
      case "draft": return "invoice-status-draft";
      case "overdue": return "invoice-status-overdue";
      default: return "invoice-status-draft";
    }
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>
            Your most recent invoices
          </CardDescription>
        </div>
        <Link to="/invoices">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {invoices.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No invoices yet</p>
            </div>
          ) : (
            invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <span className="font-medium">{invoice.customerName}</span>
                    <span className="text-sm text-muted-foreground">#{invoice.number}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-medium">{formatCurrency(invoice.total, invoice.currency)}</span>
                  <span className="text-sm text-muted-foreground">Due {formatDate(invoice.dueDate)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn("invoice-status", getStatusColor(invoice.status))}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                  <Link to={`/invoices/${invoice.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View Invoice</span>
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentInvoices;
