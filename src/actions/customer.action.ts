"use server";

import { revalidatePath } from "next/cache";
import { CustomerServices } from "@/services/customer.service";

export async function addToCartAction(payload: {
  sellerMedicineId: string;
  quantity: number;
}) {
  const result = await CustomerServices.addToCart(payload);
  if (result.success) {
    revalidatePath("/cart");
  }
  return result;
}

export async function createOrderAction(shippingAddress: string, items: any[]) {
  const formattedItems = items.map((item) => ({
    sellerMedicineId: item.sellerMedicineId || item.sellerMedicine?.id,
    quantity: item.quantity,
  }));

  const payload = {
    shippingAddress,
    items: formattedItems,
  };

  const result = await CustomerServices.createOrder(payload);

  if (result.success) {
    await CustomerServices.clearCart();

    revalidatePath("/dashboard/orders");
    revalidatePath("/dashboard/cart");
  }
  return result;
}
export async function submitReviewAction(payload: {
    medicineId: string;
    orderId:string
  rating: number;
  comment: string;
}) {
  const result = await CustomerServices.createReview(payload);
  if (result.success) {
    revalidatePath(`/medicine/${payload.medicineId}`);
  }
  return result;
}

export async function updateCartItemAction(itemId: string, quantity: number) {
  const result = await CustomerServices.updateCartItem(itemId, quantity);
  if (result.success) {
    revalidatePath("/dashboard/cart"); // Refreshes the cart totals automatically
  }
  return result;
}

export async function removeCartItemAction(itemId: string) {
  const result = await CustomerServices.removeCartItem(itemId);
  if (result.success) {
    revalidatePath("/dashboard/cart");
  }
  return result;
}
export async function cancelOrderAction(orderId: string) {
  try {
    const result = await CustomerServices.cancelOrder(orderId);

    if (result.success) {
      revalidatePath("/dashboard/orders");
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to cancel order",
    };
  }
}