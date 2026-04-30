"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, Mail, Phone, MessageCircle, ShoppingCart, Truck, CreditCard, User, Shield, HelpCircle } from "lucide-react";

const categories = [
  { icon: ShoppingCart, title: "Ordering", questions: [
    { q: "How do I place an order?", a: "Browse medicines, add to cart, and checkout with your preferred payment method." },
    { q: "Can I modify my order?", a: "Orders can be modified before they are shipped. Visit Dashboard → Orders to manage." },
    { q: "How do I cancel an order?", a: "Go to Dashboard → Orders, find the order, and click Cancel. Only pre-shipment orders can be cancelled." },
  ]},
  { icon: Truck, title: "Delivery", questions: [
    { q: "What are the delivery times?", a: "Same-day in metros (before 2 PM), 2-3 days standard, express options available." },
    { q: "Is there free shipping?", a: "Yes, free shipping on orders above $25." },
    { q: "How do I track my order?", a: "Go to Dashboard → Orders to see real-time tracking for all orders." },
  ]},
  { icon: CreditCard, title: "Payments", questions: [
    { q: "What payment methods are accepted?", a: "Credit/Debit cards, digital wallets, net banking, and Cash on Delivery (COD)." },
    { q: "Is my payment secure?", a: "Yes, we use 256-bit SSL encryption and are PCI-DSS compliant." },
    { q: "How do refunds work?", a: "Refunds are processed within 5-7 business days after return approval." },
  ]},
  { icon: User, title: "Account", questions: [
    { q: "How do I create an account?", a: "Click Sign Up, fill in your details, and choose customer or seller role." },
    { q: "How do I reset my password?", a: "Click Forgot Password on the login page and follow the email instructions." },
    { q: "How do I become a seller?", a: "Register with the seller option checked, then set up your profile and start listing." },
  ]},
  { icon: Shield, title: "Returns", questions: [
    { q: "What is the return policy?", a: "Unopened items can be returned within 7 days. Prescription medicines cannot be returned." },
    { q: "How do I initiate a return?", a: "Contact support via email or phone with your order details." },
    { q: "When will I get my refund?", a: "Refunds are processed 5-7 business days after the returned item is received." },
  ]},
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const filteredCategories = searchQuery
    ? categories.map(cat => ({
        ...cat,
        questions: cat.questions.filter(q =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(cat => cat.questions.length > 0)
    : categories;

  return (
    <div className="min-h-screen">
      <section className="py-16 bg-gradient-to-b from-blue-50 to-background dark:from-blue-950/20 dark:to-background">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <HelpCircle className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-muted-foreground mb-8">Find answers to common questions or contact our support team.</p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help..."
              className="w-full pl-11 pr-4 py-3 border rounded-xl bg-background text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-4">
            {filteredCategories.map((cat, catIndex) => (
              <div key={cat.title} className="bg-card rounded-xl border overflow-hidden">
                <button onClick={() => setOpenCategory(openCategory === catIndex ? null : catIndex)} className="w-full flex items-center justify-between p-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted"><cat.icon className="h-5 w-5" /></div>
                    <span className="font-semibold">{cat.title}</span>
                    <span className="text-xs text-muted-foreground">({cat.questions.length})</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${openCategory === catIndex ? "rotate-180" : ""}`} />
                </button>
                {openCategory === catIndex && (
                  <div className="border-t px-5 pb-4 space-y-2">
                    {cat.questions.map((faq) => (
                      <div key={faq.q} className="border-b last:border-0 py-3">
                        <button onClick={() => setOpenQuestion(openQuestion === faq.q ? null : faq.q)} className="w-full text-left flex justify-between items-center gap-2">
                          <span className="text-sm font-medium">{faq.q}</span>
                          <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${openQuestion === faq.q ? "rotate-180" : ""}`} />
                        </button>
                        {openQuestion === faq.q && (
                          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{faq.a}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-12 bg-card rounded-2xl border p-8 text-center">
            <h2 className="text-xl font-bold mb-2">Still need help?</h2>
            <p className="text-muted-foreground mb-6">Our support team is available 24/7.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="mailto:support@medistore.com" className="inline-flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-muted transition-colors text-sm font-medium">
                <Mail className="h-4 w-4" /> Email Support
              </Link>
              <Link href="tel:+15551234567" className="inline-flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-muted transition-colors text-sm font-medium">
                <Phone className="h-4 w-4" /> Call Us
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                <MessageCircle className="h-4 w-4" /> Contact Form
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
