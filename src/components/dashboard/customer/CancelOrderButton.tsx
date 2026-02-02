// components/orders/CancelOrderButton.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { toast } from "sonner";
import { cancelOrderAction } from "@/actions/customer.action";


export function CancelOrderButton({ orderId }: { orderId: string }) {
  const [isPending, setIsPending] = useState(false);

  const handleCancel = async () => {
    // Basic confirmation
    if (!confirm("Are you sure you want to cancel this order?")) return;

    setIsPending(true);
    try {
      const res = await cancelOrderAction(orderId);
      if (res.success) {
        toast.success("Order cancelled successfully");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 h-8 px-2"
      disabled={isPending}
      onClick={handleCancel}
    >
      <XCircle className="h-4 w-4 mr-1" />
      {isPending ? "Cancelling..." : "Cancel"}
    </Button>
  );
}
