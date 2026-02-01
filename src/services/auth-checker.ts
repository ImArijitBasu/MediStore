// utils/auth-checker.ts
import { userService } from "@/services/user.service";

export async function checkAuth() {
  const sessionResult = await userService.getSession();

  return {
    isAuthenticated: !!sessionResult.data?.user,
    user: sessionResult.data?.user || null,
    session: sessionResult.data?.session || null,
    error: sessionResult.error,
  };
}

export async function checkRole(requiredRole: string) {
  const authResult = await checkAuth();

  if (!authResult.isAuthenticated) {
    return {
      allowed: false,
      user: null,
      error: "Authentication required",
    };
  }

  if (authResult.user?.role !== requiredRole) {
    return {
      allowed: false,
      user: authResult.user,
      error: `${requiredRole} role required`,
    };
  }

  return {
    allowed: true,
    user: authResult.user,
    error: null,
  };
}

export async function isSeller() {
  return await checkRole("SELLER");
}

export async function isCustomer() {
  return await checkRole("CUSTOMER");
}

export async function isAdmin() {
  return await checkRole("ADMIN");
}
