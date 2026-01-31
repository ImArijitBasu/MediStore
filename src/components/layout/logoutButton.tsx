"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <Button
      onClick={handleLogout}
      size="sm"
      variant="outline"
      className="bg-red-100 hover:bg-red-200 text-red-600 border-red-200 hover:text-red-500"
    >
      Logout
    </Button>
  );
}
export default LogoutButton;
