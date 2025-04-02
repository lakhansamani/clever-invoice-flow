
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentInvoices } from "@/components/dashboard/RecentInvoices";
import { Invoice, InvoiceStatus, Stats } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, Bar, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  // Mock data
  const stats: Stats = {
    totalInvoices: 156,
    paidInvoices: 97,
    pendingInvoices: 42,
    overdueInvoices: 17,
    totalRevenue: 78450,
    currency: "USD",
  };

  const recentInvoices: Invoice[] = [
    {
      id: "1",
      companyId: "comp1",
      customerId: "cust1",
      customerName: "Acme Corporation",
      customerEmail: "billing@acme.com",
      number: "INV-2023-001",
      date: "2023-10-15",
      dueDate: "2023-11-15",
      status: "paid" as InvoiceStatus,
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
      status: "pending" as InvoiceStatus,
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
      status: "overdue" as InvoiceStatus,
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
      status: "draft" as InvoiceStatus,
      total: 4750,
      currency: "USD",
      createdAt: "2023-10-22T15:45:00Z",
      updatedAt: "2023-10-22T15:45:00Z",
    },
  ];

  // Chart data
  const monthlyRevenueData = [
    { name: "Jan", revenue: 4500 },
    { name: "Feb", revenue: 6000 },
    { name: "Mar", revenue: 5250 },
    { name: "Apr", revenue: 7800 },
    { name: "May", revenue: 8400 },
    { name: "Jun", revenue: 9200 },
    { name: "Jul", revenue: 7600 },
    { name: "Aug", revenue: 8900 },
    { name: "Sep", revenue: 11200 },
    { name: "Oct", revenue: 9600 },
    { name: "Nov", revenue: 0 },
    { name: "Dec", revenue: 0 },
  ];

  const invoiceStatusData = [
    { name: "Paid", value: stats.paidInvoices, color: "#10b981" },
    { name: "Pending", value: stats.pendingInvoices, color: "#f59e0b" },
    { name: "Overdue", value: stats.overdueInvoices, color: "#ef4444" },
  ];

  return (
    <AppLayout>
      <div className="page-container">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your invoicing dashboard</p>
        </div>
        
        <DashboardStats stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <RecentInvoices invoices={recentInvoices} />
          
          <Card>
            <CardHeader>
              <CardTitle>Invoice Status</CardTitle>
              <CardDescription>Distribution of invoice status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={invoiceStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {invoiceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} invoices`, "Count"]} 
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Revenue over the past 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenueData}>
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => 
                      new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        notation: "compact",
                        compactDisplay: "short",
                      }).format(value)
                    } 
                  />
                  <Tooltip 
                    formatter={(value) => 
                      new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(Number(value))
                    } 
                  />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
