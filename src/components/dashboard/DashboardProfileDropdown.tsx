"use client";

import { User, Home, Settings, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/layout/logoutButton";

interface DashboardProfileDropdownProps {
  user: {
    name?: string;
    email?: string;
    image?: string;
    role?: string;
  };
}

export default function DashboardProfileDropdown({ user }: DashboardProfileDropdownProps) {
  const getRoleBadgeColor = () => {
    switch (user?.role) {
      case "ADMIN": return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
      case "SELLER": return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300";
      default: return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center overflow-hidden">
            {user?.image ? (
              <Image src={user.image} alt={user.name || "User"} width={32} height={32} className="rounded-full object-cover" />
            ) : (
              <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium w-fit mt-1", getRoleBadgeColor())}>
              {user?.role || "Customer"}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Home className="h-4 w-4" />
            Go to Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/medicines" className="flex items-center gap-2 cursor-pointer">
            <LayoutDashboard className="h-4 w-4" />
            Browse Medicines
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0" onSelect={(e) => e.preventDefault()}>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
