import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const CustomerServices = {
  // --- CART ---
  getCart: async () => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/api/cart`, {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });
      return await res.json();
    } catch (error: any) {
      return { success: false, message: error.message, data: null };
    }
  },

  addToCart: async (payload: {
    sellerMedicineId: string;
    quantity: number;
  }) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },

  // --- ORDERS ---
  createOrder: async (payload: any) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },

  getMyOrders: async () => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/api/orders/my-orders`, {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store",
      });
      return await res.json();
    } catch (error: any) {
      return { success: false, data: [] };
    }
  },
  // --- GET SINGLE ORDER ---
  getOrderById: async (orderId: string) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}`, {
        headers: { Cookie: cookieStore.toString() },
        cache: "no-store", // Detailed view should always be fresh
      });
      return await res.json();
    } catch (error: any) {
      return { success: false, message: error.message, data: null };
    }
  },
  // --- REVIEWS ---
  createReview: async (payload: {
      medicineId: string;
      orderId: string;
    rating: number;
    comment: string;
  }) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },

  updateCartItem: async (itemId: string, quantity: number) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/api/cart/${itemId}`, {
        method: "PATCH",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });
      return await res.json();
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },

  removeCartItem: async (itemId: string) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/api/cart/${itemId}`, {
        method: "DELETE",
        headers: { Cookie: cookieStore.toString() },
      });
      return await res.json();
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },

  clearCart: async () => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/api/cart`, {
        method: "DELETE",
        headers: { Cookie: cookieStore.toString() },
      });
      return await res.json();
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },

  cancelOrder: async (orderId: string) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}/cancel`, {
        method: "PATCH",
        headers: { Cookie: cookieStore.toString() },
      });
      return await res.json();
    } catch (error: any) {
      return { success: false, message: "Failed to cancel order" };
    }
  },

  trackOrder: async (orderNumber: string) => {
    try {
      // This is a public route, so no cookies required
      const res = await fetch(`${API_URL}/api/orders/track/${orderNumber}`);
      return await res.json();
    } catch (error: any) {
      return { success: false, message: "Order not found" };
    }
  },
};
