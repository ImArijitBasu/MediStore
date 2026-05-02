import { createAuthClient } from "better-auth/react";

// Use the frontend's own origin so auth requests go through the
// Next.js rewrite proxy (/api/auth/* → backend server).
// This keeps cookies first-party, avoiding third-party cookie
// blocks in production where frontend and backend are on different domains.
export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  fetchOptions: {
    credentials: "include",
  },
});