import { OverviewCardsGrid } from "@/components/dashboard/OverviewCards";
import DashboardChart from "@/components/dashboard/DashboardChart";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import { AdminServices } from "@/services/admin.service";



export default async function AdminDashboardPage() {
  const statsRes = await AdminServices.getAdminStats();
  const stats = statsRes?.data || { users: {}, platform: {} };

  const overviewCards = [
    {
      title: "Total Users",
      value: stats.users?.total?.toString() || "0",
      description: "Active platform users",
      icon: Users,
      trend: { value: 12, isPositive: true },
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Medicines",
      value: stats.platform?.medicines?.toString() || "0",
      description: "Listed on platform",
      icon: Package,
      trend: { value: 8, isPositive: true },
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Total Orders",
      value: stats.platform?.orders?.toString() || "0",
      description: "All time orders",
      icon: ShoppingCart,
      trend: { value: 15, isPositive: true },
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Revenue",
      value: `$${stats.platform?.revenue?.toLocaleString() || "0"}`,
      description: "All time revenue",
      icon: DollarSign,
      trend: { value: 22, isPositive: true },
      color: "text-amber-600 dark:text-amber-400",
    },
  ];

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
          data={stats.charts?.monthlyOrdersData || []}
          type="bar"
          dataKey="orders"
        />
        <DashboardChart
          title="Revenue Trend"
          description="Revenue growth over the last 6 months"
          data={stats.charts?.revenueData || []}
          type="line"
          dataKey="revenue"
          colors={["#10b981"]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart
          title="Medicines by Category"
          description="Distribution across categories"
          data={stats.charts?.categoryData || []}
          type="pie"
          dataKey="value"
        />
        <div className="bg-card rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {(stats.charts?.recentActivity || []).map((activity: any, i: number) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                <div className={`h-2 w-2 rounded-full ${
                  activity.type === "user" ? "bg-blue-500" :
                  activity.type === "order" ? "bg-emerald-500" :
                  activity.type === "medicine" ? "bg-purple-500" : "bg-amber-500"
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{new Date(activity.time).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}