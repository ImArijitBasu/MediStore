"use server";

import { SellerServices } from "@/services/seller.service";
import { revalidatePath } from "next/cache";

export async function updateStockAction(medicineId: string, quantity: number) {
  const result = await SellerServices.updateSellerMedicine(medicineId, {
    stockQuantity: quantity,
  });
  if (result.success) revalidatePath("/seller-dashboard/inventory");
  return result;
}

export async function deleteMedicineAction(medicineId: string) {
  const result = await SellerServices.deleteSellerMedicine(medicineId);
  if (result.success) {
    revalidatePath("/seller-dashboard/inventory");
  }

  return result;
}