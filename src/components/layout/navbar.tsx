"use client";

import { Menu, User, ChevronDown, Home, ShoppingBag, LayoutDashboard, Package, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Accordion } from "@/components/ui/accordion";

import { ModeToggle } from "./themeControl";
import LogoutButton from "./logoutButton";

interface MenuItem {
  title: string;
  url: string;
}

interface UserInfo {
  name?: string;
  email?: string;
  image?: string;
  role?: string;
}

interface NavbarProps {
  className?: string;
  isAuthenticated?: boolean;
  userInfo?: UserInfo | null;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

const Navbar = ({
  className,
  isAuthenticated = false,
  userInfo = null,
  logo = {
    url: "/",
    src: "/logo.jpg",
    alt: "logo",
    title: "MediStore",
  },
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
}: NavbarProps) => {
  // Routes when logged out (4 minimum)
  const publicMenu: MenuItem[] = [
    { title: "Home", url: "/" },
    { title: "Medicines", url: "/medicines" },
    { title: "Categories", url: "/categories" },
    { title: "About", url: "/about" },
  ];

  // Routes when logged in (6 minimum)
  const authMenu: MenuItem[] = [
    { title: "Home", url: "/" },
    { title: "Medicines", url: "/medicines" },
    { title: "Categories", url: "/categories" },
    { title: "About", url: "/about" },
    { title: "Blog", url: "/blog" },
    { title: "Contact", url: "/contact" },
  ];

  const menu = isAuthenticated ? authMenu : publicMenu;

  // Determine dashboard URL based on role
  const getDashboardUrl = () => {
    if (!userInfo?.role) return "/dashboard";
    switch (userInfo.role) {
      case "ADMIN": return "/admin-dashboard";
      case "SELLER": return "/seller-dashboard";
      default: return "/dashboard";
    }
  };

  const getRoleBadgeColor = () => {
    switch (userInfo?.role) {
      case "ADMIN": return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
      case "SELLER": return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300";
      default: return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
    }
  };

  return (
    <section className={cn("sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b", className)}>
      <div className="container mx-auto px-4">
        {/* Desktop */}
        <nav className="hidden lg:flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={32}
                height={32}
                className="dark:invert"
              />
              <span className="text-lg font-semibold tracking-tight">{logo.title}</span>
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      asChild
                      className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                    >
                      <Link href={item.url}>{item.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 pl-2 pr-3">
                    <div className="h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center overflow-hidden">
                      {userInfo?.image ? (
                        <Image src={userInfo.image} alt={userInfo.name || "User"} width={28} height={28} className="rounded-full object-cover" />
                      ) : (
                        <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <span className="text-sm font-medium max-w-[100px] truncate hidden xl:inline">
                      {userInfo?.name || "Account"}
                    </span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{userInfo?.name || "User"}</p>
                      <p className="text-xs text-muted-foreground truncate">{userInfo?.email}</p>
                      <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium w-fit mt-1", getRoleBadgeColor())}>
                        {userInfo?.role || "Customer"}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardUrl()} className="flex items-center gap-2 cursor-pointer">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`${getDashboardUrl()}/profile`} className="flex items-center gap-2 cursor-pointer">
                      <Settings className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {userInfo?.role === "CUSTOMER" && (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/orders" className="flex items-center gap-2 cursor-pointer">
                        <Package className="h-4 w-4" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-0" onSelect={(e) => e.preventDefault()}>
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile */}
        <div className="lg:hidden flex items-center justify-between h-14">
          <Link href={logo.url} className="flex items-center gap-2">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={28}
              height={28}
              className="dark:invert"
            />
            <span className="text-base font-semibold">{logo.title}</span>
          </Link>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2">
                      <Image src={logo.src} alt={logo.alt} width={24} height={24} className="dark:invert" />
                      {logo.title}
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                {/* User info on mobile */}
                {isAuthenticated && userInfo && (
                  <div className="px-5 py-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                        {userInfo.image ? (
                          <Image src={userInfo.image} alt={userInfo.name || ""} width={40} height={40} className="rounded-full object-cover" />
                        ) : (
                          <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{userInfo.name}</p>
                        <p className="text-xs text-muted-foreground">{userInfo.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex flex-col px-5 gap-1">
                  <Accordion type="single" collapsible>
                    {menu.map((item) => (
                      <Link
                        key={item.title}
                        href={item.url}
                        className="block py-2.5 px-3 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </Accordion>

                  <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                    {isAuthenticated ? (
                      <>
                        <Button asChild variant="outline">
                          <Link href={getDashboardUrl()} className="flex items-center gap-2">
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                          </Link>
                        </Button>
                        <LogoutButton />
                      </>
                    ) : (
                      <>
                        <Button asChild variant="outline">
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button asChild>
                          <Link href={auth.signup.url}>{auth.signup.title}</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar };
