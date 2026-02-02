import { notFound } from "next/navigation";
import Image from "next/image";
import { CustomerServices } from "@/services/customer.service";

export default async function OrderDetailsPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { orderId } = await params;
  const result = await CustomerServices.getOrderById(orderId);

  if (!result.success || !result.data) notFound();
  const order = result.data;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Order {order.orderNumber}
          </h1>
          <p className="text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="text-left md:text-right">
          <span
            className={`px-4 py-1 rounded-full text-sm font-bold shadow-sm ${
              order.status === "CANCELLED"
                ? "bg-red-100 text-red-700"
                : order.status === "DELIVERED"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
            }`}
          >
            {order.status}
          </span>
          <p className="text-xs text-gray-400 mt-2 whitespace-nowrap">
            ID: {order.id}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Items & Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold mb-4 text-gray-800 border-b pb-2">
              Items Ordered
            </h3>
            <div className="divide-y divide-gray-50">
              {order.items.map((item: any) => {
                const medicine = item.sellerMedicine?.medicine;
                return (
                  <div key={item.id} className="flex items-center gap-4 py-4">
                    <div className="w-20 h-20 bg-gray-50 rounded-lg flex-shrink-0 relative overflow-hidden border border-gray-100">
                      {medicine?.thumbnail ? (
                        <Image
                          src={medicine.thumbnail}
                          alt={medicine.name}
                          fill
                          className="object-contain p-2"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                          💊
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-800">
                        {medicine?.name || "Unknown Medicine"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Seller: {item.sellerMedicine?.seller?.name}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
                <span>Total</span>
                <span>${order.finalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold mb-3 text-gray-800">
              Shipping Information
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {order.shippingAddress}
            </p>
            {order.notes && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-800">
                  <span className="font-bold">Note:</span> {order.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Timeline/Logs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
            <h3 className="font-bold mb-6 text-gray-800">Order Status Logs</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-z-10 before:h-full before:w-0.5 before:bg-gray-100">
              {order.orderLogs?.map((log: any, index: number) => (
                <div key={log.id} className="relative flex gap-4">
                  <div
                    className={`mt-1.5 w-8 h-8 rounded-full border-4 border-white flex-shrink-0 flex items-center justify-center shadow-sm ${
                      index === 0
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-current" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-800">
                      {log.status}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 italic">
                      "{log.notes}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
