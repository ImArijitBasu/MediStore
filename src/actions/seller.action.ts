"use server";

import { SellerServices } from "@/services/seller.service";
import { revalidatePath } from "next/cache";

export async function createMedicineAction(payload: any) {
  const result = await SellerServices.createMedicine(payload);
  if (result.success) {
    revalidatePath("/seller-dashboard/inventory");
  }
  return result;
}

export async function updateStockAction(medicineId: string, quantity: number) {
  const result = await SellerServices.updateSellerMedicine(medicineId, {
    stockQuantity: quantity,
  });
  if (result.success) {
    revalidatePath("/seller-dashboard/inventory");
  }
  return result;
}

export async function deleteMedicineAction(medicineId: string) {
  const result = await SellerServices.deleteSellerMedicine(medicineId);
  if (result.success) {
    revalidatePath("/seller-dashboard/inventory");
  }
  return result;
}

export async function updateOrderStatusAction(orderId: string, status: string) {
  const result = await SellerServices.updateOrderStatus(orderId, status);
  if (result.success) {
    revalidatePath("/seller-dashboard/orders");
    revalidatePath(`/seller-dashboard/orders/${orderId}`);
  }
  return result;
}