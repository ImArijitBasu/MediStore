"use client";

import { removeCartItemAction, updateCartItemAction } from "@/actions/customer.action";
import Image from "next/image";
import { useState } from "react";

import { toast } from "sonner"; // Optional: for feedback

export default function CartItemRow({ item }: { item: any }) {
  const [isPending, setIsPending] = useState(false);

  // Destructure data based on your API structure
  const sellerMed = item.sellerMedicine;
  const medicine = sellerMed?.medicine;
  const price = sellerMed?.price || 0;

  const handleUpdateQty = async (newQty: number) => {
    if (newQty < 1 || isPending) return;

    setIsPending(true);
    const result = await updateCartItemAction(item.id, newQty);

    if (!result.success) {
      toast.error(result.message || "Failed to update quantity");
    }
    setIsPending(false);
  };

  const handleRemove = async () => {
    if (isPending) return;
    setIsPending(true);
    const result = await removeCartItemAction(item.id);
    if (!result.success) {
      toast.error("Failed to remove item");
      setIsPending(false);
    }
  };

  return (
    <div
      className={`p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center transition-opacity ${isPending ? "opacity-50" : "opacity-100"}`}
    >
      {/* Product Info */}
      <div className="md:col-span-6 flex items-center gap-4">
        <div className="w-20 h-20 bg-gray-50 rounded-lg relative overflow-hidden shrink-0 border border-gray-100">
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
        <div>
          <h4 className="font-bold text-gray-800">{medicine?.name}</h4>
          <p className="text-sm text-gray-500 line-clamp-1">
            {medicine?.brandName}
          </p>
          <button
            onClick={handleRemove}
            className="text-xs text-red-500 font-medium mt-2 hover:underline disabled:text-gray-400"
            disabled={isPending}
          >
            Remove Item
          </button>
        </div>
      </div>

      {/* Quantity Control */}
      <div className="md:col-span-3 flex justify-center">
        <div className="flex items-center border rounded-lg bg-white overflow-hidden shadow-sm">
          <button
            className="px-3 py-1 hover:bg-gray-100 text-gray-600 transition-colors disabled:opacity-50"
            onClick={() => handleUpdateQty(item.quantity - 1)}
            disabled={isPending || item.quantity <= 1}
          >
            -
          </button>
          <span className="px-4 py-1 font-semibold min-w-10 text-center">
            {item.quantity}
          </span>
          <button
            className="px-3 py-1 hover:bg-gray-100 text-gray-600 transition-colors disabled:opacity-50"
            onClick={() => handleUpdateQty(item.quantity + 1)}
            disabled={isPending}
          >
            +
          </button>
        </div>
      </div>

      {/* Item Total */}
      <div className="md:col-span-3 text-right font-bold text-gray-900 text-lg">
        ${(price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}
