
import { Stats } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { 
  TrendingUp, 
  CircleDollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle 
} from "lucide-react";

interface DashboardStatsProps {
  stats: Stats;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: stats.currency || "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const statCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: CircleDollarSign,
      description: "Total invoiced amount",
      iconClass: "text-emerald-500 bg-emerald-100",
    },
    {
      title: "Total Invoices",
      value: stats.totalInvoices,
      icon: TrendingUp,
      description: "All-time invoices",
      iconClass: "text-blue-500 bg-blue-100",
    },
    {
      title: "Paid Invoices",
      value: stats.paidInvoices,
      icon: CheckCircle,
      description: `${((stats.paidInvoices / stats.totalInvoices) * 100 || 0).toFixed(0)}% of total`,
      iconClass: "text-green-500 bg-green-100",
    },
    {
      title: "Pending",
      value: stats.pendingInvoices,
      icon: Clock,
      description: `${((stats.pendingInvoices / stats.totalInvoices) * 100 || 0).toFixed(0)}% of total`,
      iconClass: "text-amber-500 bg-amber-100",
    },
    {
      title: "Overdue",
      value: stats.overdueInvoices,
      icon: AlertCircle,
      description: `${((stats.overdueInvoices / stats.totalInvoices) * 100 || 0).toFixed(0)}% of total`,
      iconClass: "text-red-500 bg-red-100",
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {statCards.map((stat, index) => (
        <Card key={index} className="stats-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </div>
            <div className={`p-2 rounded-full ${stat.iconClass}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default DashboardStats;
