import { cookies } from "next/headers";

const AUTH_URL = process.env.AUTH_URL;
//! for server components only
export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${AUTH_URL}/get-session`, {
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
      console.log(err);
      return {
        data: null,
        error: {
          message: "something went wrong !",
        },
      };
    }
  },
};
