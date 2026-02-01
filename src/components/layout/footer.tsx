"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Heart,
  Shield,
  Truck,
  MessageSquare,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function MediStoreFooter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t mt-auto">
      {/* Trust Badges */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "100% Genuine",
                desc: "Verified Medicines",
              },
              { icon: Truck, title: "Fast Delivery", desc: "Same Day in City" },
              { icon: Clock, title: "24/7 Support", desc: "Always Available" },
              { icon: Heart, title: "Secure Payment", desc: "COD Available" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-foreground flex items-center justify-center">
                  <span className="text-background font-bold text-lg">M</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">MediStore</h2>
                  <p className="text-sm text-muted-foreground">
                    Your Trusted Online Medicine Shop
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                We provide genuine medicines with fast delivery. Your health is
                our priority.
              </p>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Stay Informed</h3>
                <p className="text-sm text-muted-foreground">
                  Get health tips, new arrivals, and exclusive offers.
                </p>
              </div>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button type="submit">
                    {isSubscribed ? "Subscribed!" : "Subscribe"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our Privacy Policy
                </p>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-medium">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { text: "Home", href: "/" },
                { text: "Shop Medicines", href: "/shop" },
                { text: "Categories", href: "/categories" },
                { text: "Track Order", href: "/track-order" },
                { text: "FAQs", href: "/faq" },
              ].map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-medium">Contact Us</h3>
            <ul className="space-y-4">
              {[
                {
                  icon: MapPin,
                  text: "123 Health Street, Medical City",
                  link: null,
                },
                {
                  icon: Phone,
                  text: "+1 (555) 123-4567",
                  link: "tel:+15551234567",
                },
                {
                  icon: Mail,
                  text: "support@medistore.com",
                  link: "mailto:support@medistore.com",
                },
                { icon: Clock, text: "24/7 Customer Support", link: null },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <item.icon className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                  <div>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {item.text}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MediStore. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
              <Link
                href="/privacy"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Terms of Service
              </Link>
              <Link
                href="/shipping"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Shipping Policy
              </Link>
              <Link
                href="/contact"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              size="icon"
              variant="outline"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="h-9 w-9"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* License Info */}
        <div className="text-center mt-6 pt-6 border-t">
          <p className="text-xs text-muted-foreground">
            Licensed Pharmacy • FDA Approved • DL No: MED123456 • Not for
            medical emergencies
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Consult your doctor before use. Keep out of reach of children.
          </p>
        </div>
      </div>
    </footer>
  );
}
