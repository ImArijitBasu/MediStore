// components/home/MedicineCategory.tsx
import { CategoryServices } from "@/services/category.service";
import Link from "next/link";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  isActive: boolean;
  medicineCount: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  totalCategories: number;
  categories: Category[];
}

// Default medical category icons with colors
const categoryIcons = [
  {
    icon: "💊",
    color: "from-blue-400 to-blue-600",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: "🧴",
    color: "from-indigo-400 to-indigo-600",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
  },
  {
    icon: "💉",
    color: "from-purple-400 to-purple-600",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    icon: "🤧",
    color: "from-cyan-400 to-cyan-600",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
  },
  {
    icon: "❤️",
    color: "from-red-400 to-red-600",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
  {
    icon: "🧠",
    color: "from-emerald-400 to-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    icon: "🦷",
    color: "from-teal-400 to-teal-600",
    bg: "bg-teal-50 dark:bg-teal-900/20",
  },
  {
    icon: "👶",
    color: "from-pink-400 to-pink-600",
    bg: "bg-pink-50 dark:bg-pink-900/20",
  },
  {
    icon: "👁️",
    color: "from-amber-400 to-amber-600",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    icon: "🏃",
    color: "from-lime-400 to-lime-600",
    bg: "bg-lime-50 dark:bg-lime-900/20",
  },
];

const MedicineCategory = async () => {
  const result = await CategoryServices.getAllCategories();
  const data: ApiResponse = result.data;

  if (!data || !data.categories || data.categories.length === 0) {
    return null;
  }

  const activeCategories = data.categories.filter((cat) => cat.isActive);

  if (activeCategories.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-linear-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Shop by{" "}
            <span className="text-blue-600 dark:text-blue-400">Category</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse our {data.totalCategories} health categories to find exactly
            what you need
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-8 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
            <div className="w-3 h-1 bg-blue-400 dark:bg-blue-400 rounded-full"></div>
            <div className="w-3 h-1 bg-blue-300 dark:bg-blue-300 rounded-full"></div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {activeCategories.map((category, index) => {
            const iconData = categoryIcons[index % categoryIcons.length];
            const hasImage =
              category.image && category.image.startsWith("http");

            return (
              <div key={category.id} className="group">
                <Link
                  href={`/medicines?category=${category.id}`}
                  className="block"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl dark:shadow-gray-900/30 dark:hover:shadow-gray-900/50 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500/30 h-full">
                    {/* Category Image/Icon */}
                    <div
                      className={`p-6 ${iconData.bg} flex items-center justify-center min-h-45`}
                    >
                      {hasImage ? (
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white/50 shadow-lg">
                          <Image
                            src={category.image!}
                            alt={category.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100px, 150px"
                          />
                        </div>
                      ) : (
                        <div className="relative">
                          <div
                            className={`w-20 h-20 rounded-full bg-linear-to-br ${iconData.color} flex items-center justify-center text-3xl shadow-lg`}
                          >
                            {iconData.icon}
                          </div>
                          <div className="absolute inset-0 rounded-full bg-white/20 blur-md group-hover:blur-xl transition-all duration-300"></div>
                        </div>
                      )}
                    </div>

                    {/* Category Details */}
                    <div className="p-4">
                      <div className="mb-3">
                        <h3 className="font-bold text-gray-800 dark:text-white text-sm md:text-base line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 line-clamp-2">
                            {category.description}
                          </p>
                        )}
                      </div>

                      {/* Medicine Count & Status */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-1 text-xs">
                          <span
                            className={`inline-flex items-center gap-1 ${category.medicineCount > 0 ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-gray-500"}`}
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                              />
                            </svg>
                            {category.medicineCount} products
                          </span>
                        </div>

                        {/* View Button */}
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                          View
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href="/medicines"
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-gray-900/50"
          >
            <span>Browse All Medicines</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MedicineCategory;
