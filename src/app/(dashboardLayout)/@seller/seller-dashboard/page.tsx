import { OverviewCardsGrid } from "@/components/dashboard/OverviewCards";
import DashboardChart from "@/components/dashboard/DashboardChart";
import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import { userService } from "@/services/user.service";



export default async function SellerDashboardPage() {
  const statsRes = await userService.getUserStats();
  const stats = statsRes?.data || { medicines: 0, orders: 0, revenue: 0 };

  const overviewCards = [
    {
      title: "My Medicines",
      value: stats.medicines?.toString() || "0",
      description: "Listed products",
      icon: Package,
      trend: { value: 5, isPositive: true },
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Orders",
      value: stats.orders?.toString() || "0",
      description: "All time orders",
      icon: ShoppingCart,
      trend: { value: 18, isPositive: true },
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Revenue",
      value: `$${stats.revenue?.toLocaleString() || "0"}`,
      description: "All time revenue",
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
          description="Number of items sold per month"
          data={stats.charts?.salesData || []}
          type="bar"
          dataKey="sales"
        />
        <DashboardChart
          title="Revenue Trend"
          description="Revenue growth over time"
          data={stats.charts?.revenueData || []}
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
