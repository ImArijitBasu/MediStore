"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const AUTH_URL = process.env.AUTH_URL;

export const getSession = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${AUTH_URL}/get-session`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
      next: { tags: ["session"] }, // Add cache tag
    });

    const session = await res.json();

    if (!session?.user) {
      return {
        data: null,
        error: {
          message: "No active session",
        },
      };
    }

    return {
      data: session,
      error: null,
    };
  } catch (err) {
    console.error("Session error:", err);
    return {
      data: null,
      error: {
        message: "Failed to get session",
      },
    };
  }
};

export const getUser = async () => {
  const session = await getSession();
  return {
    user: session.data?.user || null,
    error: session.error,
  };
};

export const getCurrentUser = async () => {
  const session = await getSession();
  return session.data?.user || null;
};

export const invalidateSession = async () => {
  revalidateTag("session" ,"max"); // Invalidate cache
};
