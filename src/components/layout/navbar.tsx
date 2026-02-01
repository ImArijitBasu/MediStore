"use client";

import { Menu } from "lucide-react";
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
import { Accordion } from "@/components/ui/accordion";

import { ModeToggle } from "./themeControl";
import LogoutButton from "./logoutButton";

interface MenuItem {
  title: string;
  url: string;
}

interface NavbarProps {
  className?: string;
  isAuthenticated?: boolean;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
  noAuth?: {
    dashboard: { title: string; url: string };
    logout: { title: string; url: string };
  };
}

const Navbar = ({
  className,
  isAuthenticated = false,
  logo = {
    url: "/",
    src: "/logo.jpg",
    alt: "logo",
    title: "MediStore",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "medicines", url: "/medicines" },
    { title: "Shop", url: "/shop" },
    { title: "Categories", url: "/categories" },
    { title: "About", url: "/about" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
  noAuth = {
    dashboard: { title: "Dashboard", url: "/dashboard" },
    logout: { title: "Logout", url: "/logout" },
  },
}: NavbarProps) => {
  return (
    <section className={cn("py-4", className)}>
      <div className="container mx-auto">
        {/* Desktop */}
        <nav className="hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={32}
                height={32}
                className="dark:invert"
              />
              <span className="text-lg font-semibold">{logo.title}</span>
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      asChild
                      className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted"
                    >
                      <Link href={item.url}>{item.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />

            {isAuthenticated ? (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href={noAuth.dashboard.url}>
                    {noAuth.dashboard.title}
                  </Link>
                </Button>
                <LogoutButton />
              </>
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
        <div className="lg:hidden flex items-center justify-between">
          <Link href={logo.url}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={32}
              height={32}
              className="dark:invert"
            />
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <Link href={logo.url}>{logo.title}</Link>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col px-5 gap-6">
                <Accordion type="single" collapsible>
                  {menu.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className="block py-2 text-sm font-medium"
                    >
                      {item.title}
                    </Link>
                  ))}
                </Accordion>

                <div className="flex flex-col gap-3">
                  {isAuthenticated ? (
                    <>
                      <Button asChild variant="outline">
                        <Link href={noAuth.dashboard.url}>
                          {noAuth.dashboard.title}
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
    </section>
  );
};

export { Navbar };
