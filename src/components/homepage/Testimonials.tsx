"use client";

import { useState } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Regular Customer",
    rating: 5,
    comment: "MediStore has been a lifesaver! The delivery is super fast and all medicines are genuine. I have been ordering from them for over a year now and never had any issues.",
    avatar: "S",
  },
  {
    id: 2,
    name: "Dr. Ahmed Khan",
    role: "Healthcare Professional",
    rating: 5,
    comment: "I recommend MediStore to all my patients. The platform is easy to use, prices are competitive, and the medicine quality is always verified and authentic.",
    avatar: "A",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Verified Buyer",
    rating: 4,
    comment: "Great selection of medicines and very competitive prices. The customer support team is incredibly helpful and responsive. Highly recommend!",
    avatar: "E",
  },
  {
    id: 4,
    name: "Michael Chen",
    role: "Monthly Subscriber",
    rating: 5,
    comment: "The convenience of ordering medicines online and having them delivered to my doorstep is unmatched. MediStore makes healthcare accessible and affordable.",
    avatar: "M",
  },
  {
    id: 5,
    name: "Priya Sharma",
    role: "Verified Buyer",
    rating: 5,
    comment: "Excellent service! The prescription upload feature is very convenient and the pharmacist verification gives me confidence in every order I place.",
    avatar: "P",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Senior Customer",
    rating: 4,
    comment: "As a senior citizen, I find MediStore extremely user-friendly. The medicine reminders and auto-refill options are thoughtful features that make my life easier.",
    avatar: "J",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleCount = 3;

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-blue-600 dark:text-blue-400">Customers</span> Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by thousands of customers across the country for genuine medicines and reliable service
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-8 h-1 bg-blue-600 dark:bg-blue-500 rounded-full" />
            <div className="w-3 h-1 bg-blue-400 rounded-full" />
            <div className="w-3 h-1 bg-blue-300 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(activeIndex, activeIndex + visibleCount).map((t) => (
            <div
              key={t.id}
              className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              <Quote className="h-8 w-8 text-blue-200 dark:text-blue-800 mb-4" />
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{t.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <StarRating rating={t.rating} />
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(testimonials.length / visibleCount) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i * visibleCount)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                Math.floor(activeIndex / visibleCount) === i
                  ? "w-8 bg-blue-600 dark:bg-blue-400"
                  : "w-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              aria-label={`Show testimonials page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
