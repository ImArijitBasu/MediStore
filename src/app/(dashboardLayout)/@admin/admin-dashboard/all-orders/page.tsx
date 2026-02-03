// app/admin/orders/page.tsx
import { AdminServices } from "@/services/admin.service";
import { OrderTable } from "@/components/dashboard/admin/OrderTable";
import { ShoppingBag } from "lucide-react";

export default async function AdminOrdersPage() {
  const response = await AdminServices.getAllOrders(); // Assuming this exists in your service
  const orders = response?.data || [];
console.log(orders);
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-amber-600" /> Platform Orders
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Global transaction history and delivery tracking.
          </p>
        </div>
      </div>

      <OrderTable orders={orders} />
    </div>
  );
}
