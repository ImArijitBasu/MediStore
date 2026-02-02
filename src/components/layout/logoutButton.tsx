"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await authClient.signOut();
    router.push("/");
    router.refresh();
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
