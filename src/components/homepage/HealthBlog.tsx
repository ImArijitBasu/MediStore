import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const blogPosts = [
  {
    slug: "understanding-otc-medicines",
    title: "Understanding Over-the-Counter Medicines: A Complete Guide",
    excerpt: "Learn about the different types of OTC medicines, when to use them safely, and important precautions every household should know.",
    category: "Health Education",
    readTime: "5 min read",
    date: "April 28, 2026",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  },
  {
    slug: "building-home-first-aid-kit",
    title: "How to Build the Perfect Home First Aid Kit",
    excerpt: "A comprehensive checklist of essential medicines and supplies every home should have for emergencies and everyday health needs.",
    category: "Wellness Tips",
    readTime: "4 min read",
    date: "April 25, 2026",
    color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
  },
  {
    slug: "seasonal-allergies-guide",
    title: "Seasonal Allergies: Prevention, Treatment, and Relief",
    excerpt: "Expert advice on managing seasonal allergies effectively with the right medications and lifestyle adjustments.",
    category: "Health Guide",
    readTime: "6 min read",
    date: "April 22, 2026",
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
  },
];

export default function HealthBlog() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Health <span className="text-blue-600 dark:text-blue-400">Blog</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Stay informed with expert health tips, medicine guides, and wellness advice from our team.
            </p>
          </div>
          <Link
            href="/blog"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all"
          >
            View all posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-card rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Card header gradient */}
              <div className="h-48 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center relative">
                <div className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-300">📋</div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.color}`}>
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
