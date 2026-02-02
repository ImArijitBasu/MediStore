"use server";

import { AdminServices } from "@/services/admin.service";
import { revalidatePath } from "next/cache";

export async function toggleUserStatusAction(
  userId: string,
  currentStatus: string,
) {
  try {
    const action = currentStatus === "ACTIVE" ? "ban" : "unban";

    const res = await AdminServices.updateUserStatus(userId, action);

    if (res.success) {
      revalidatePath("/admin-dashboard");
    }
    return res;
  } catch (error: any) {
    return {
      success: false,
      message: "Server Action: Failed to update user status",
    };
  }
}

export async function createCategoryAction(name: string) {
  if (!name) return { success: false, message: "Category name is required" };

  try {
    const res = await AdminServices.createCategory(name);
    if (res.success) {
      revalidatePath("/admin-dashboard");
    }
    return res;
  } catch (error: any) {
    return { success: false, message: "Failed to create category" };
  }
}

export async function deleteCategoryAction(id: string) {
  try {
    const res = await AdminServices.deleteCategory(id);
    if (res.success) {
      revalidatePath("/admin-dashboard");
    }
    return res;
  } catch (error: any) {
    return { success: false, message: "Failed to delete category" };
  }
}

export async function updateCategoryAction(id: string, name: string) {
  try {
    const res = await AdminServices.updateCategory(id, name);
    if (res.success) {
      revalidatePath("/admin-dashboard");
    }
    return res;
  } catch (error: any) {
    return { success: false, message: "Failed to update category" };
  }
}
