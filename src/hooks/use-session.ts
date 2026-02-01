// hooks/use-session.ts
"use client";

import { useState, useEffect } from "react";

const AUTH_URL = process.env.AUTH_URL || "http://localhost:5000/api/auth";

export function useSession() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${AUTH_URL}/get-session`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await response.json();
      console.log("Session data from Express:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch session");
      }

      setSession(data);
    } catch (err: any) {
      console.error("Session fetch error:", err);
      setError(err.message || "Network error");
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    session: session?.data,
    user: session?.data?.user || session?.user || null,
    loading,
    error,
    refetch: fetchSession,
    isAuthenticated: !!session?.data?.user || !!session?.user,
  };
}
