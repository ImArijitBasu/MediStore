
export const MedicineServices = {
  getAllMedicines: async (filters?: {
    search?: string;
    category?: string;
    manufacturer?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
    sortBy?: "price" | "name" | "createdAt" | "rating";
    sortOrder?: "asc" | "desc";
  }) => {
    try {
      const queryParams = new URLSearchParams();

      if (filters?.search) queryParams.append("search", filters.search);
      if (filters?.category) queryParams.append("category", filters.category);
      if (filters?.manufacturer)
        queryParams.append("manufacturer", filters.manufacturer);
      if (filters?.minPrice !== undefined)
        queryParams.append("minPrice", filters.minPrice.toString());
      if (filters?.maxPrice !== undefined)
        queryParams.append("maxPrice", filters.maxPrice.toString());
      if (filters?.page !== undefined)
        queryParams.append("page", filters.page.toString());
      if (filters?.limit !== undefined)
        queryParams.append("limit", filters.limit.toString());
      if (filters?.sortBy) queryParams.append("sortBy", filters.sortBy);
      if (filters?.sortOrder)
        queryParams.append("sortOrder", filters.sortOrder);

      const queryString = queryParams.toString();
      const url = queryString
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/medicines?${queryString}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/medicines`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to fetch medicines: ${res.statusText}`);
      }

      const apiResponse = await res.json();

      return {
        success: apiResponse.success,
        message: apiResponse.message,
        data: apiResponse.data?.medicines || [],
        total: apiResponse.data?.total || 0,
        pagination: apiResponse.data?.pagination,
        filters: apiResponse.data?.filters,
        error: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to fetch medicines",
        data: [],
        total: 0,
        pagination: null,
        filters: null,
        error: error.message || "Failed to fetch medicines",
      };
    }
  },

  getMedicineById: async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/medicines/${id}`,
      );

      if (!res.ok) {
        if (res.status === 404) {
          return {
            success: false,
            data: null,
            error: "Medicine not found",
          };
        }
        throw new Error(`Failed to fetch medicine: ${res.statusText}`);
      }

      const response = await res.json();

      let medicineData = response.data;
      if (typeof medicineData === "string") {
        try {
          medicineData = JSON.parse(medicineData);
        } catch (parseError) {
          medicineData = null;
        }
      }

      if (response.success) {
        return {
          success: true,
          data: medicineData,
          error: null,
        };
      } else {
        return {
          success: false,
          data: null,
          error: response.message || "Failed to fetch medicine",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.message || "Failed to fetch medicine details",
      };
    }
  },
  getFeaturedMedicines: async (limit: number = 8) => {
    try {
    
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/medicines?minPrice=0&sortBy=rating&sortOrder=desc&limit=${limit}`,
      );

      if (!res.ok) {
        throw new Error(
          `Failed to fetch featured medicines: ${res.statusText}`,
        );
      }

      const data = await res.json();

      if (data.success) {
        return { data: data || [], error: null };
      } else {
        return {
          data: [],
          error: data.message || "Failed to fetch featured medicines",
        };
      }
    } catch (error: any) {
      return {
        data: [],
        error: error.message || "Failed to fetch featured medicines",
      };
    }
  },
};
