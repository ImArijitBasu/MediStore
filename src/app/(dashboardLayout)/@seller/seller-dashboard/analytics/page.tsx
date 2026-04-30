"use client";

import DashboardChart from "@/components/dashboard/DashboardChart";
import { OverviewCardsGrid } from "@/components/dashboard/OverviewCards";
import { TrendingUp, Eye, ShoppingCart, BarChart3 } from "lucide-react";

const dailySalesData = [
  { name: "Mon", sales: 5 },
  { name: "Tue", sales: 8 },
  { name: "Wed", sales: 12 },
  { name: "Thu", sales: 7 },
  { name: "Fri", sales: 15 },
  { name: "Sat", sales: 20 },
  { name: "Sun", sales: 10 },
];

const productPerformance = [
  { name: "Paracetamol", value: 120 },
  { name: "Amoxicillin", value: 85 },
  { name: "Vitamin C", value: 72 },
  { name: "Ibuprofen", value: 65 },
  { name: "Others", value: 45 },
];

const revenueByMonth = [
  { name: "Jan", revenue: 1200 },
  { name: "Feb", revenue: 1900 },
  { name: "Mar", revenue: 2500 },
  { name: "Apr", revenue: 3200 },
  { name: "May", revenue: 2800 },
  { name: "Jun", revenue: 3500 },
];

const analyticsCards = [
  {
    title: "Total Views",
    value: "2,847",
    description: "Product page views this month",
    icon: Eye,
    trend: { value: 14, isPositive: true },
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    description: "Views to purchase ratio",
    icon: TrendingUp,
    trend: { value: 0.5, isPositive: true },
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Avg Order Value",
    value: "$42.50",
    description: "Per transaction average",
    icon: ShoppingCart,
    trend: { value: 8, isPositive: true },
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Rating Score",
    value: "4.7/5",
    description: "Average customer rating",
    icon: BarChart3,
    color: "text-amber-600 dark:text-amber-400",
  },
];

export default function SellerAnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Detailed insights into your sales performance and trends.</p>
      </div>

      <OverviewCardsGrid cards={analyticsCards} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart
          title="Daily Sales (This Week)"
          description="Number of orders per day"
          data={dailySalesData}
          type="bar"
          dataKey="sales"
        />
        <DashboardChart
          title="Revenue by Month"
          description="Monthly revenue trend"
          data={revenueByMonth}
          type="line"
          dataKey="revenue"
          colors={["#10b981"]}
        />
      </div>

      <DashboardChart
        title="Top Products by Sales"
        description="Your best-selling medicines"
        data={productPerformance}
        type="pie"
        dataKey="value"
      />
    </div>
  );
}
