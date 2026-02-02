"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Minus, Plus, ShoppingCart } from "lucide-react";
import { addToCartAction } from "@/actions/customer.action";

export default function AddToCartButton({
  sellerMedicineId,
  stock,
}: {
  sellerMedicineId: string;
  stock: number;
}) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const result = await addToCartAction({ sellerMedicineId, quantity });
      if (result.success) {
        toast.success("Added to cart!");
      } else {
        toast.error(result.message || "Failed to add to cart");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-11 bg-white">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 hover:bg-gray-100 transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-10 text-center font-medium">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
          className="px-3 hover:bg-gray-100 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={loading || stock === 0}
        className="flex-1 md:flex-none px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <ShoppingCart className="w-5 h-5" />
        )}
        Add to Cart
      </button>
    </div>
  );
}
