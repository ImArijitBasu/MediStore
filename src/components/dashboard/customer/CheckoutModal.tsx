"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createOrderAction } from "@/actions/customer.action";

export default function CheckoutModal({
  totalAmount,
  items,
}: {
  totalAmount: number;
  items: any[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

const handlePlaceOrder = async () => {
  setLoading(true);
    try {
      console.log(totalAmount ,items);
    const result = await createOrderAction(address, items);
    console.log("Order Result:", result); // Check your BROWSER console for this

   if (result.success) {
     toast.success("Order placed!");
     setIsOpen(false);

     // Use the ID from the nested data object returned by your backend
     const newOrderId = result.data?.id;
     router.push(`/dashboard/orders/${newOrderId}`);
   } else {
     // This will show the specific error message from the backend
     toast.error(result.message || "Failed to create order");
   }
  } catch (err) {
    toast.error("Client-side error placing order");
  } finally {
    setLoading(false);
  }
};
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg transition-all"
      >
        Checkout Now
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Delivery Details</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          You are about to place an order for{" "}
          <span className="font-bold text-gray-800">
            ${totalAmount.toFixed(2)}
          </span>
          .
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shipping Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full address (Street, House No, City...)"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none min-h-25 text-sm"
              disabled={loading}
            />
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading || !address}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Processing..." : "Confirm & Place Order"}
          </button>

          <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
            Cash on Delivery only
          </p>
        </div>
      </div>
    </div>
  );
}
