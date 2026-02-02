// components/orders/CancelOrderConfirm.tsx
"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { XCircle, Loader2 } from "lucide-react";

import { toast } from "sonner";
import { cancelOrderAction } from "@/actions/customer.action";

export function CancelOrderConfirm({ orderId }: { orderId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      const res = await cancelOrderAction(orderId);
      if (res.success) {
        toast.success("Order cancelled successfully");
      } else {
        toast.error(res.message || "Failed to cancel order");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 h-8 gap-1"
        >
          <XCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Cancel</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will cancel your order. This action cannot be undone if the
            seller has already started shipment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Go Back</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleCancel();
            }}
            className="bg-rose-600 hover:bg-rose-700 focus:ring-rose-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              "Confirm Cancellation"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
