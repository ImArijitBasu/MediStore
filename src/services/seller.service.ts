import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const SellerServices = {
  getSellerMedicines: async () => {
    const cookieStore = cookies();
    try {
      const res = await fetch(`${API_URL}/api/medicines/seller/inventory`, {
        headers: {
          Cookie: (await cookieStore).toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Unauthorized or failed to fetch inventory");
      }

      const data = await res.json();

      return {
        success: data.success,
        message: data.message,
        data: data.data || [],
        error: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to fetch seller medicines",
        data: [],
        error: error.message,
      };
    }
  },

  createMedicine: async (payload: any) => {
    const cookieStore = cookies();
    try {
      const res = await fetch(`${API_URL}/api/medicines`, {
        method: "POST",
        headers: {
          Cookie: (await cookieStore).toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      return {
        success: data.success,
        message: data.message,
        data: data.data || null,
        error: data.success ? null : data.message,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to create medicine",
        data: null,
        error: error.message,
      };
    }
  },

  updateSellerMedicine: async (id: string, payload: any) => {
    const cookieStore = cookies();
    try {
      const res = await fetch(`${API_URL}/api/medicines/seller/${id}`, {
        method: "PUT",
        headers: {
          Cookie: (await cookieStore).toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      return {
        success: data.success,
        message: data.message,
        data: data.data || null,
        error: data.success ? null : data.message,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to update medicine",
        data: null,
        error: error.message,
      };
    }
  },

  deleteSellerMedicine: async (id: string) => {
    const cookieStore = cookies();
    try {
      const res = await fetch(`${API_URL}/api/medicines/seller/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: (await cookieStore).toString(),
        },
      });

      const data = await res.json();

      return {
        success: data.success,
        message: data.message,
        data: data.data || null,
        error: data.success ? null : data.message,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to delete medicine",
        data: null,
        error: error.message,
      };
    }
  },

  getSellerOrders: async () => {
    const cookieStore = cookies();
    try {
      const res = await fetch(`${API_URL}/api/medicines/seller/orders`, {
        headers: {
          Cookie: (await cookieStore).toString(),
        },
        cache: "no-store",
      });

      const data = await res.json();

      return {
        success: data.success,
        message: data.message,
        data: data.data || [],
        error: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to fetch orders",
        data: [],
        error: error.message,
      };
    }
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const cookieStore = cookies();
    try {
      const res = await fetch(
        `${API_URL}/api/medicines/seller/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            Cookie: (await cookieStore).toString(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        },
      );

      const data = await res.json();

      return {
        success: data.success,
        message: data.message,
        data: data.data || null,
        error: data.success ? null : data.message,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to update order status",
        data: null,
        error: error.message,
      };
    }
  },
};
