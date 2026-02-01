// actions/review.actions.ts
"use server";

import { cookies } from "next/headers";

export const reviewActions = {
  /**
   * Create a review (with authentication)
   */
  createReviewAction: async (reviewData: {
    medicineId: string;
    rating: number;
    comment?: string;
    orderId?: string;
  }) => {
    try {
      const cookieStore = await cookies();
      const cookieString = cookieStore.toString();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`,
        {
          method: "POST",
          headers: {
            Cookie: cookieString,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
          credentials: "include",
        },
      );

      const data = await res.json();

      return {
        success: data.success,
        message: data.message,
        data: data.data,
        error: data.success ? null : data.message,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to create review",
        data: null,
        error: error.message || "Failed to create review",
      };
    }
  },
};
