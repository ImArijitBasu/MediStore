"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Shield,
  Truck,
  Clock,
  Heart,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSession } from "@/hooks/use-session";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const { user } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState([
    { value: "500+", label: "Medicines" },
    { value: "50+", label: "Categories" },
    { value: "10K+", label: "Happy Customers" },
    { value: "24/7", label: "Support" },
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/medicines?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 via-white to-cyan-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-blue-200/10 blur-3xl dark:bg-blue-900/10" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-cyan-200/10 blur-3xl dark:bg-cyan-900/10" />

      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-medium">
              <CheckCircle className="h-4 w-4" />
              <span>Trusted by 10,000+ Customers</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Your Health,
                <span className="block text-blue-600 dark:text-blue-400">
                  Our Priority
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Get genuine medicines delivered to your doorstep. Fast,
                reliable, and 100% verified healthcare solutions from trusted
                pharmacies.
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-xl">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search medicines, categories, symptoms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base border-2 border-border/50 hover:border-border focus:border-blue-500"
                  />
                </div>
                <Button type="submit" size="lg" className="h-12 px-8">
                  Search
                </Button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Try: "Paracetamol", "Vitamin C", "Cold & Flu"
              </p>
            </form>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border"
                >
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
          </div>

          {/* Right Content - Trust Indicators */}
          <div className="space-y-6">
            {/* Trust Badges Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Shield,
                  title: "100% Genuine",
                  description: "Verified from licensed pharmacies",
                  color: "text-green-600 dark:text-green-400",
                  bg: "bg-green-50 dark:bg-green-900/20",
                },
                {
                  icon: Truck,
                  title: "Fast Delivery",
                  description: "Same-day in major cities",
                  color: "text-blue-600 dark:text-blue-400",
                  bg: "bg-blue-50 dark:bg-blue-900/20",
                },
                {
                  icon: Clock,
                  title: "24/7 Support",
                  description: "Always available to help",
                  color: "text-purple-600 dark:text-purple-400",
                  bg: "bg-purple-50 dark:bg-purple-900/20",
                },
                {
                  icon: Heart,
                  title: "Secure Payment",
                  description: "COD & digital payments",
                  color: "text-red-600 dark:text-red-400",
                  bg: "bg-red-50 dark:bg-red-900/20",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-6 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-lg",
                    item.bg,
                  )}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={cn("p-3 rounded-full", item.bg)}>
                      <item.icon className={cn("h-6 w-6", item.color)} />
                    </div>
                    <h3 className={cn("font-semibold", item.color)}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/medicines">
                  Shop Medicines
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              {!user && (
                <Button asChild size="lg" variant="outline">
                  <Link href="/auth/register">Become a Seller</Link>
                </Button>
              )}

              <Button asChild size="lg" variant="ghost">
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Scroll to explore
            </span>
            <div className="h-6 w-px bg-border animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
