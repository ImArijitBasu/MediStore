// category.service.ts
export const CategoryServices = {
  getAllCategories: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.statusText}`);
      }

      const apiResponse = await res.json();

      return {
        success: apiResponse.success,
        message: apiResponse.message,
        data: apiResponse.data || [],
        error: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to fetch categories",
        data: [],
        error: error.message || "Failed to fetch categories",
      };
    }
  },
};
