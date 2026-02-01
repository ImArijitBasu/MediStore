// medicine.actions.ts - WITH "use server"
"use server";

import { cookies } from "next/headers";

export const medicineActions = {
  addMedicine: async (medicineData: any) => {
    try {
      const cookieStore = await cookies();
      const cookieString = cookieStore.toString();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/medicines`,
        {
          method: "POST",
          headers: {
            Cookie: cookieString,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(medicineData),
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
        message: error.message || "Failed to add medicine",
        data: null,
        error: error.message || "Failed to add medicine",
      };
    }
  },
  getSellerInventory: async () => {
    try {
      const cookieStore = await cookies();
      const cookieString = cookieStore.toString();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/medicines/seller/inventory`,
        {
          method: "GET",
          headers: {
            Cookie: cookieString,
          },
          credentials: "include",
          cache: "no-store",
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
        message: error.message || "Failed to fetch inventory",
        data: null,
        error: error.message || "Failed to fetch inventory",
      };
    }
  },
  updateSellerMedicine: async (medicineId: string, updateData: any) => {
    try {
      const cookieStore = await cookies();
      const cookieString = cookieStore.toString();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/medicines/seller/${medicineId}`,
        {
          method: "PUT",
          headers: {
            Cookie: cookieString,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
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
        message: error.message || "Failed to update medicine",
        data: null,
        error: error.message || "Failed to update medicine",
      };
    }
  },

  deleteSellerMedicine: async (medicineId: string) => {
    try {
      const cookieStore = await cookies();
      const cookieString = cookieStore.toString();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/medicines/seller/${medicineId}`,
        {
          method: "DELETE",
          headers: {
            Cookie: cookieString,
          },
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
        message: error.message || "Failed to delete medicine",
        data: null,
        error: error.message || "Failed to delete medicine",
      };
    }
  },
};
