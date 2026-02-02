import SellerOrdersDashboard from "@/components/dashboard/seller/OrdersTable";
import { SellerServices } from "@/services/seller.service";


export default async function SellerOrdersPage() {
  const response = await SellerServices.getSellerOrders();
  const orders = response.data || [];
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders Management</h1>
        <p className="text-muted-foreground text-sm">
          Manage incoming pharmacy orders and track delivery statuses.
        </p>
      </div>

      <SellerOrdersDashboard initialOrders={orders} />
    </div>
  );
}
