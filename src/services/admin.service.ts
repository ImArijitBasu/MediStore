import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AdminServices = {

  getAllUsers: async () => {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/admin/users`, {
      headers: { Cookie: cookieStore.toString() },
      next: { revalidate: 0 }, // Ensure fresh data
    });
    return res.json();
  },

  updateUserStatus: async (userId: string, status: "ban" | "unban") => {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/admin/users/${userId}/${status}`, {
      method: "PATCH",
      headers: { Cookie: cookieStore.toString() },
    });
    return res.json();
  },

  getAllOrders: async () => {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/orders/admin/all-orders`, {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    });
    return res.json();
  },

  getAllMedicines: async () => {
    const res = await fetch(`${API_URL}/api/medicines`, {
      next: { revalidate: 60 },
    });
    return res.json();
  },

  createCategory: async (name: string) => {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ name }),
    });
    return res.json();
  },

  updateCategory: async (id: string, name: string) => {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ name }),
    });
    return res.json();
  },

  deleteCategory: async (id: string) => {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/categories/${id}`, {
      method: "DELETE",
      headers: { Cookie: cookieStore.toString() },
    });
    return res.json();
  },

  getAdminStats: async () => {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/admin/stats`, {
      headers: { Cookie: cookieStore.toString() },
      next: { revalidate: 300 }, 
    });
    return res.json();
  },
};
