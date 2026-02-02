// app/dashboard/orders/page.tsx
import { CustomerServices } from "@/services/customer.service";
import CustomerOrdersDashboard from "@/components/dashboard/customer/CustomerOrderDashboard";

export default async function OrdersPage() {
  const orderResult = await CustomerServices.getMyOrders();
  const orders = orderResult.data || [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <CustomerOrdersDashboard orders={orders} />
    </div>
  );
}
