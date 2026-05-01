//! services/user.service.ts
import { cookies } from "next/headers";

const AUTH_URL = process.env.NEXT_PUBLIC_API_URL;
//! for server components only
export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${AUTH_URL}/api/auth/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store", // don't cache users data
      });
      const session = await res.json();
      if (session === null) {
        return {
          data: null,
          error: {
            message: "Session missing !!",
          },
        };
      }
      return { data: session, error: null };
    } catch (err) {
      return {
        data: null,
        error: {
          message: "something went wrong !",
        },
      };
    }
  },

  getUserStats: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${AUTH_URL}/api/user/stats`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { revalidate: 0 }, // always get fresh stats
      });
      return await res.json();
    } catch (error: any) {
      return { success: false, message: error.message, data: null };
    }
  },
};
