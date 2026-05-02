"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    try {
      await authClient.signOut();
      toast.success("Logged out successfully!");
      // Use hard navigation to fully clear client state and avoid
      // stale server-component session re-fetches in dashboard layouts
      window.location.href = "/";
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      size="sm"
      variant="outline"
      disabled={isLoading}
      className="bg-red-100 hover:bg-red-200 text-red-600 border-red-200 hover:text-red-500"
    >
      {isLoading ? (
        <>
          <span className="animate-spin mr-2">⟳</span>
          Logging out...
        </>
      ) : (
        "Logout"
      )}
    </Button>
  );
}
export default LogoutButton;
