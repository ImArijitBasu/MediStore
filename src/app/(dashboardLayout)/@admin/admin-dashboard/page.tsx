"use client";

import { OverviewCardsGrid } from "@/components/dashboard/OverviewCards";
import DashboardChart from "@/components/dashboard/DashboardChart";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";

const monthlyOrdersData = [
  { name: "Jan", orders: 45 },
  { name: "Feb", orders: 52 },
  { name: "Mar", orders: 61 },
  { name: "Apr", orders: 78 },
  { name: "May", orders: 69 },
  { name: "Jun", orders: 85 },
];

const revenueData = [
  { name: "Jan", revenue: 4200 },
  { name: "Feb", revenue: 5100 },
  { name: "Mar", revenue: 6400 },
  { name: "Apr", revenue: 7800 },
  { name: "May", revenue: 6900 },
  { name: "Jun", revenue: 8500 },
];

const categoryData = [
  { name: "Pain Relief", value: 35 },
  { name: "Antibiotics", value: 25 },
  { name: "Vitamins", value: 20 },
  { name: "Cardiac", value: 12 },
  { name: "Other", value: 8 },
];

const overviewCards = [
  {
    title: "Total Users",
    value: "1,247",
    description: "Active platform users",
    icon: Users,
    trend: { value: 12, isPositive: true },
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Total Medicines",
    value: "534",
    description: "Listed on platform",
    icon: Package,
    trend: { value: 8, isPositive: true },
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Total Orders",
    value: "3,892",
    description: "All time orders",
    icon: ShoppingCart,
    trend: { value: 15, isPositive: true },
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Revenue",
    value: "$48,250",
    description: "This month",
    icon: DollarSign,
    trend: { value: 22, isPositive: true },
    color: "text-amber-600 dark:text-amber-400",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here is an overview of your platform.</p>
      </div>

      <OverviewCardsGrid cards={overviewCards} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart
          title="Monthly Orders"
          description="Order trends over the last 6 months"
          data={monthlyOrdersData}
          type="bar"
          dataKey="orders"
        />
        <DashboardChart
          title="Revenue Trend"
          description="Revenue growth over the last 6 months"
          data={revenueData}
          type="line"
          dataKey="revenue"
          colors={["#10b981"]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart
          title="Medicines by Category"
          description="Distribution across categories"
          data={categoryData}
          type="pie"
          dataKey="value"
        />
        <div className="bg-card rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: "New user registered", time: "2 min ago", type: "user" },
              { action: "Order #3892 placed", time: "15 min ago", type: "order" },
              { action: "Medicine stock updated", time: "1 hour ago", type: "medicine" },
              { action: "New review submitted", time: "2 hours ago", type: "review" },
              { action: "Order #3891 delivered", time: "3 hours ago", type: "order" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                <div className={`h-2 w-2 rounded-full ${
                  activity.type === "user" ? "bg-blue-500" :
                  activity.type === "order" ? "bg-emerald-500" :
                  activity.type === "medicine" ? "bg-purple-500" : "bg-amber-500"
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}