// actions/review.actions.ts
"use server";


import { CustomerServices } from "@/services/customer.service";
import { revalidatePath } from "next/cache";

export async function createReviewAction(payload: {
  medicineId: string;
  orderId: string;
  rating: number;
  comment: string;
}) {
  try {
    // Call your existing service
    const result = await CustomerServices.createReview(payload);

    if (result.success) {
      // Refresh the orders page so the UI stays in sync
      revalidatePath("/dashboard/orders");
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
