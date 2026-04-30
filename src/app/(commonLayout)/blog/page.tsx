import { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Health Blog",
  description: "Expert health tips from MediStore.",
};

const blogPosts = [
  { slug: "understanding-otc-medicines", title: "Understanding Over-the-Counter Medicines", excerpt: "Learn about different types of OTC medicines and when to use them safely.", category: "Health Education", readTime: "5 min", date: "Apr 28, 2026", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
  { slug: "building-home-first-aid-kit", title: "How to Build the Perfect Home First Aid Kit", excerpt: "Essential medicines and supplies every home should have for emergencies.", category: "Wellness Tips", readTime: "4 min", date: "Apr 25, 2026", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300" },
  { slug: "seasonal-allergies-guide", title: "Seasonal Allergies: Prevention and Treatment", excerpt: "Expert advice on managing seasonal allergies with the right medications.", category: "Health Guide", readTime: "6 min", date: "Apr 22, 2026", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" },
  { slug: "vitamins-minerals-guide", title: "Essential Vitamins and Minerals Guide", excerpt: "Overview of vital vitamins, their benefits, and best supplement sources.", category: "Nutrition", readTime: "7 min", date: "Apr 18, 2026", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" },
  { slug: "safe-medicine-storage", title: "How to Store Medicines Safely at Home", excerpt: "Proper medicine storage for maintaining drug efficacy and safety.", category: "Safety Tips", readTime: "4 min", date: "Apr 15, 2026", color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300" },
  { slug: "managing-chronic-conditions", title: "Managing Chronic Conditions with Medication", excerpt: "Best practices for adherence, refills, and healthcare communication.", category: "Chronic Care", readTime: "8 min", date: "Apr 12, 2026", color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300" },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 bg-gradient-to-b from-blue-50 to-background dark:from-blue-950/20 dark:to-background">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Health <span className="text-blue-600 dark:text-blue-400">Blog</span></h1>
          <p className="text-lg text-muted-foreground">Expert health tips and medicine guides from our professionals.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-card rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center relative">
                  <div className="text-5xl opacity-30">📋</div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.color}`}>{post.category}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="font-semibold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">{post.title}</h2>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t">
                    <div className="flex gap-3">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
