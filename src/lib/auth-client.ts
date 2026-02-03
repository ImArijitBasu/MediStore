// import { createAuthClient } from "better-auth/react";
// export const authClient = createAuthClient({
//   /** The base URL of the server (optional if you're using the same domain) */
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
//   fetchOptions: {
//     credentials: "include"
//   }
// });
// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   baseURL: typeof window !== "undefined" ? window.location.origin : "",
//   fetchOptions: {
//     credentials: "include",
//   },
// });

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Use the full URL for Server Components, and relative for the Browser
  baseURL:
    typeof window === "undefined"
      ? "https://medistore-xi.vercel.app" // e.g., https://medistore-xi.vercel.app
      : window.location.origin,
  fetchOptions: {
    credentials: "include",
  },
});