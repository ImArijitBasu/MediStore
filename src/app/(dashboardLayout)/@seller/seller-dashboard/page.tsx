"use client";

import { OverviewCardsGrid } from "@/components/dashboard/OverviewCards";
import DashboardChart from "@/components/dashboard/DashboardChart";
import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";

const salesData = [
  { name: "Jan", sales: 12 },
  { name: "Feb", sales: 19 },
  { name: "Mar", sales: 25 },
  { name: "Apr", sales: 32 },
  { name: "May", sales: 28 },
  { name: "Jun", sales: 35 },
];

const revenueData = [
  { name: "Jan", revenue: 1200 },
  { name: "Feb", revenue: 1900 },
  { name: "Mar", revenue: 2500 },
  { name: "Apr", revenue: 3200 },
  { name: "May", revenue: 2800 },
  { name: "Jun", revenue: 3500 },
];

const overviewCards = [
  {
    title: "My Medicines",
    value: "48",
    description: "Listed products",
    icon: Package,
    trend: { value: 5, isPositive: true },
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Total Orders",
    value: "156",
    description: "All time orders",
    icon: ShoppingCart,
    trend: { value: 18, isPositive: true },
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Revenue",
    value: "$15,200",
    description: "This month",
    icon: DollarSign,
    trend: { value: 25, isPositive: true },
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Growth",
    value: "+18%",
    description: "vs last month",
    icon: TrendingUp,
    trend: { value: 18, isPositive: true },
    color: "text-amber-600 dark:text-amber-400",
  },
];

export default function SellerDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>
        <p className="text-muted-foreground">Track your sales, inventory, and performance.</p>
      </div>

      <OverviewCardsGrid cards={overviewCards} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart
          title="Monthly Sales"
          description="Number of orders per month"
          data={salesData}
          type="bar"
          dataKey="sales"
        />
        <DashboardChart
          title="Revenue Trend"
          description="Revenue growth over time"
          data={revenueData}
          type="line"
          dataKey="revenue"
          colors={["#10b981"]}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-xl border p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { title: "Add Medicine", href: "/seller-dashboard/add-medicine", icon: "💊" },
            { title: "View Inventory", href: "/seller-dashboard/inventory", icon: "📦" },
            { title: "View Orders", href: "/seller-dashboard/orders", icon: "🛒" },
            { title: "Analytics", href: "/seller-dashboard/analytics", icon: "📊" },
          ].map((action) => (
            <a
              key={action.title}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-muted transition-colors text-center"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-sm font-medium">{action.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
