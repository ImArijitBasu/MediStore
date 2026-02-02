export const ReviewServices = {
  getMedicineReviews: async (medicineId: string, options?: any) => {
    if (!medicineId) {
      console.error("DEBUG: getMedicineReviews called with NO medicineId");
      return { success: false, data: [], total: 0 };
    }

    try {
      const queryParams = new URLSearchParams();
      if (options?.page) queryParams.append("page", options.page.toString());
      if (options?.limit) queryParams.append("limit", options.limit.toString());
      if (options?.sortBy) queryParams.append("sortBy", options.sortBy);
      if (options?.sortOrder)
        queryParams.append("sortOrder", options.sortOrder);

      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const url = `${baseUrl}/api/reviews/medicine/${medicineId}?${queryParams.toString()}`;

      const res = await fetch(url, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

      const data = await res.json();
      const actualReviews = data.data?.reviews || data.data || [];

      return {
        success: data.success,
        data: Array.isArray(actualReviews) ? actualReviews : [],
        total: data.data?.total || actualReviews.length || 0,
        averageRating: data.data?.averageRating || 0,
        ratingDistribution: data.data?.ratingDistribution || {},
      };
    } catch (error: any) {
      console.error("REVIEWS_FETCH_ERROR:", error.message);
      return { success: false, data: [], error: error.message };
    }
  },
};
