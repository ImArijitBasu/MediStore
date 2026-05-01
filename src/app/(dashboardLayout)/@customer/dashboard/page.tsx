import { OverviewCardsGrid } from "@/components/dashboard/OverviewCards";
import DashboardChart from "@/components/dashboard/DashboardChart";
import { ShoppingCart, DollarSign, Star, Package } from "lucide-react";
import { userService } from "@/services/user.service";



export default async function CustomerDashboardPage() {
  const statsRes = await userService.getUserStats();
  const stats = statsRes?.data || { totalOrders: 0, pendingOrders: 0, totalSpent: 0 };

  const overviewCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders?.toString() || "0",
      description: "All time purchases",
      icon: ShoppingCart,
      trend: { value: 10, isPositive: true },
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Spent",
      value: `$${stats.totalSpent?.toLocaleString() || "0"}`,
      description: "Lifetime spending",
      icon: DollarSign,
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Reviews Given",
      value: "12",
      description: "Helping others choose",
      icon: Star,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Active Orders",
      value: stats.pendingOrders?.toString() || "0",
      description: "Currently in progress",
      icon: Package,
      color: "text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <p className="text-muted-foreground">Track your orders, spending, and activity.</p>
      </div>

      <OverviewCardsGrid cards={overviewCards} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart
          title="Order Status"
          description="Distribution of your orders by status"
          data={stats.charts?.orderStatusData || []}
          type="pie"
          dataKey="value"
        />
        <DashboardChart
          title="Monthly Spending"
          description="Your spending over the last 6 months"
          data={stats.charts?.spendingData || []}
          type="line"
          dataKey="spending"
          colors={["#8b5cf6"]}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-xl border p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { title: "Browse Medicines", href: "/medicines", icon: "💊" },
            { title: "View Cart", href: "/dashboard/cart", icon: "🛒" },
            { title: "My Orders", href: "/dashboard/orders", icon: "📦" },
            { title: "My Profile", href: "/dashboard/profile", icon: "👤" },
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