
// export const MedicineServices = {
//   getAllMedicine: async () => {
//     try {
//       const res = await fetch(
//         `${process.env.API_URL}/api/medicines`,
//       );
//       const data = await res.json();
//       if (!data) {
//         return { data: null, error: "category data fetch failed!" };
//       }
//       return { data: data, error: null };
//     } catch (error) {
//       return { data: null, error: "category data fetch failed!" };
//     }
//   },
// };

// medicine.service.ts
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
      // Build query string from filters
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

      // Return a cleaner structure
      return {
        success: apiResponse.success,
        message: apiResponse.message,
        data: apiResponse.data?.medicines || [], // This is the key change!
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
  /**
   * Get single medicine details by ID
   */
  getMedicineById: async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/medicines/${id}`,
      );

      if (!res.ok) {
        if (res.status === 404) {
          return { data: null, error: "Medicine not found" };
        }
        throw new Error(`Failed to fetch medicine: ${res.statusText}`);
      }

      const data = await res.json();

      if (data.success) {
        return { data: data.data, error: null };
      } else {
        return {
          data: null,
          error: data.message || "Failed to fetch medicine",
        };
      }
    } catch (error: any) {
      return {
        data: null,
        error: error.message || "Failed to fetch medicine details",
      };
    }
  },

  /**
   * Search medicines by name, brand, generic name, or description
   */
  searchMedicines: async (query: string, limit: number = 10) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/medicines?search=${encodeURIComponent(query)}&limit=${limit}`,
      );

      if (!res.ok) {
        throw new Error(`Failed to search medicines: ${res.statusText}`);
      }

      const data = await res.json();

      if (data.success) {
        return { data: data.data?.medicines || [], error: null };
      } else {
        return {
          data: [],
          error: data.message || "Failed to search medicines",
        };
      }
    } catch (error: any) {
      return {
        data: [],
        error: error.message || "Failed to search medicines",
      };
    }
  },

  /**
   * Get medicines by category
   */
  getMedicinesByCategory: async (categoryId: string, limit: number = 20) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/medicines?category=${categoryId}&limit=${limit}`,
      );

      if (!res.ok) {
        throw new Error(
          `Failed to fetch category medicines: ${res.statusText}`,
        );
      }

      const data = await res.json();

      if (data.success) {
        return {
          data: data.data?.medicines || [],
          total: data.data?.total || 0,
          error: null,
        };
      } else {
        return {
          data: [],
          total: 0,
          error: data.message || "Failed to fetch category medicines",
        };
      }
    } catch (error: any) {
      return {
        data: [],
        total: 0,
        error: error.message || "Failed to fetch category medicines",
      };
    }
  },

  /**
   * Get featured medicines (by rating, in stock)
   * Note: Your backend doesn't have inStock filter directly, but we can filter by minPrice > 0
   */
  getFeaturedMedicines: async (limit: number = 8) => {
    try {
      // Using rating sort and minPrice > 0 to ensure medicines with sellers
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
        return { data: data.data?.medicines || [], error: null };
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

  /**
   * Get medicines within a price range
   */
  getMedicinesByPriceRange: async (
    minPrice: number,
    maxPrice: number,
    limit: number = 20,
  ) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/medicines?minPrice=${minPrice}&maxPrice=${maxPrice}&limit=${limit}`,
      );

      if (!res.ok) {
        throw new Error(
          `Failed to fetch medicines by price range: ${res.statusText}`,
        );
      }

      const data = await res.json();

      if (data.success) {
        return {
          data: data.data?.medicines || [],
          total: data.data?.total || 0,
          error: null,
        };
      } else {
        return {
          data: [],
          total: 0,
          error: data.message || "Failed to fetch medicines by price range",
        };
      }
    } catch (error: any) {
      return {
        data: [],
        total: 0,
        error: error.message || "Failed to fetch medicines by price range",
      };
    }
  },
};