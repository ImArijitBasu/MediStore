"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  ShoppingBag,
  Pill,
  UserCheck,
  ShieldAlert,
  Layers,
  ArrowUpRight,
  Store,
} from "lucide-react";

interface StatsProps {
  stats: {
    users: {
      total: number;
      customers: number;
      sellers: number;
      admins: number;
      active: number;
      banned: number;
    };
    platform: {
      orders: number;
      medicines: number;
      categories: number;
    };
  };
}

export function AdminStatsCards({ stats }: StatsProps) {
  if (!stats) return null;

  const userMetrics = [
    {
      label: "Total Users",
      value: stats.users.total,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Active Customers",
      value: stats.users.customers,
      icon: UserCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Verified Sellers",
      value: stats.users.sellers,
      icon: Store,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Banned Accounts",
      value: stats.users.banned,
      icon: ShieldAlert,
      color: stats.users.banned > 0 ? "text-destructive" : "text-slate-400",
      bg: stats.users.banned > 0 ? "bg-red-50" : "bg-slate-50",
    },
  ];

  const platformMetrics = [
    {
      label: "Total Orders",
      value: stats.platform.orders,
      icon: ShoppingBag,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Medicines",
      value: stats.platform.medicines,
      icon: Pill,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
    {
      label: "Categories",
      value: stats.platform.categories,
      icon: Layers,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {platformMetrics.map((item, idx) => (
          <Card
            key={idx}
            className="border-border/50 shadow-sm transition-all hover:shadow-md hover:border-primary/20 group"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {item.label}
              </CardTitle>
              <div
                className={`p-2 rounded-lg ${item.bg} group-hover:scale-110 transition-transform`}
              >
                <item.icon className={`h-4 w-4 ${item.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">
                {item.value}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                Live platform data <ArrowUpRight className="h-3 w-3" />
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {userMetrics.map((item, idx) => (
          <Card key={idx} className="border-none shadow-none bg-muted/40">
            <CardHeader className="flex flex-row items-center gap-3 pb-2 space-y-0">
              <div className={`p-1.5 rounded-md ${item.bg}`}>
                <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
              </div>
              <CardTitle className="text-xs font-semibold text-muted-foreground">
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
