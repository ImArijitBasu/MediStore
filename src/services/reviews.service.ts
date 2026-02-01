export const ReviewServices = {
  getMedicineReviews: async (
    medicineId: string,
    options?: {
      page?: number;
      limit?: number;
      sortBy?: "rating" | "createdAt";
      sortOrder?: "asc" | "desc";
    },
  ) => {
    try {
      const queryParams = new URLSearchParams();

      if (options?.page) queryParams.append("page", options.page.toString());
      if (options?.limit) queryParams.append("limit", options.limit.toString());
      if (options?.sortBy) queryParams.append("sortBy", options.sortBy);
      if (options?.sortOrder)
        queryParams.append("sortOrder", options.sortOrder);

      const queryString = queryParams.toString();
      const url = queryString
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/medicine/${medicineId}?${queryString}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/medicine/${medicineId}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to fetch reviews: ${res.statusText}`);
      }

      const data = await res.json();

      return {
        success: data.success,
        message: data.message,
        data: data.data?.reviews || [],
        total: data.data?.total || 0,
        pagination: data.data?.pagination,
        averageRating: data.data?.averageRating || 0,
        ratingDistribution: data.data?.ratingDistribution || {},
        error: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to fetch reviews",
        data: [],
        total: 0,
        pagination: null,
        averageRating: 0,
        ratingDistribution: {},
        error: error.message || "Failed to fetch reviews",
      };
    }
  },
};
