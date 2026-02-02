import { CustomerServices } from "@/services/customer.service";
import Link from "next/link";
import Image from "next/image";
import CartItemRow from "@/components/dashboard/customer/CartItemRow";
import CheckoutModal from "@/components/dashboard/customer/CheckoutModal";


export default async function CartPage() {
  const result = await CustomerServices.getCart();

  // Basic error handling
  if (!result?.success || !result?.data) {
    return (
      <div className="p-10 text-center bg-red-50 rounded-xl border border-red-100">
        <p className="text-red-600 font-medium">
          Unable to load your cart. Please try again later.
        </p>
      </div>
    );
  }

  const cart = result.data;
  const items = cart.items || [];
  const summary = cart.summary || {
    totalAmount: 0,
    finalAmount: 0,
    totalDiscount: 0,
    totalItems: 0,
  };

  // Empty State logic
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl">
          🛒
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500">
          Looks like you haven't added any medicines yet.
        </p>
        <Link
          href="/medicines"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all"
        >
          Browse Medicines
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
        <p className="text-gray-500">
          You have {summary.totalItems} items in your list
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section: Item List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Table Header - Desktop Only */}
            <div className="hidden md:grid grid-cols-12 p-4 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <div className="col-span-6">Product Details</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Subtotal</div>
            </div>

            <div className="divide-y divide-gray-100">
              {items.map((item: any) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
          </div>

          <Link
            href="/medicines"
            className="inline-flex items-center text-blue-600 font-medium hover:gap-2 transition-all gap-1 text-sm"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* Right Section: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6 pb-2 border-b">
              Order Summary
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  ${Number(summary.totalAmount).toFixed(2)}
                </span>
              </div>

              {summary.totalDiscount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Total Discount</span>
                  <span className="font-semibold">
                    -${Number(summary.totalDiscount).toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>

              <div className="pt-4 border-t flex justify-between items-end">
                <div>
                  <p className="text-base font-bold text-gray-900">
                    Total Amount
                  </p>
                  <p className="text-xs text-gray-400">Including VAT & Taxes</p>
                </div>
                <span className="text-2xl font-black text-blue-600">
                  ${Number(summary.finalAmount).toFixed(2)}
                </span>
              </div>
            </div>

            <CheckoutModal totalAmount={summary.finalAmount} items={cart.items} />

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="p-1 bg-gray-100 rounded">🛡️</span>
                Secure encrypted checkout
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="p-1 bg-gray-100 rounded">💊</span>
                Verified Pharmacy Products
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
