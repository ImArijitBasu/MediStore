// src/app/(commonLayout)/medicines/page.tsx
"use client";

import MedicineComponent from "@/components/medicines/MedicineComponent";
import { MedicineGridSkeleton } from "@/components/medicines/MedicineCardSkeleton";
import { MedicineServices } from "@/services/medicine.service";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const MedicinePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState<any>(null);
  const [filters, setFilters] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Get current filters from URL
  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentPage = searchParams.get("page") || "1";
  const currentSortBy = searchParams.get("sortBy") || "createdAt";
  const currentSortOrder = searchParams.get("sortOrder") || "desc";
  const currentLimit = searchParams.get("limit") || "12";

  // Fetch categories for filter dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
        const data = await res.json();
        if (data.success) {
          setCategories(data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch medicines with filters
  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await MedicineServices.getAllMedicines({
          search: currentSearch || undefined,
          category: currentCategory || undefined,
          minPrice: currentMinPrice ? parseFloat(currentMinPrice) : undefined,
          maxPrice: currentMaxPrice ? parseFloat(currentMaxPrice) : undefined,
          page: parseInt(currentPage),
          limit: parseInt(currentLimit),
          sortBy: currentSortBy as any,
          sortOrder: currentSortOrder as any,
        });

        if (response.success) {
          setMedicines(response.data);
          setTotal(response.total);
          setPagination(response.pagination);
          setFilters(response.filters);
        } else {
          setError(response.message);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load medicines");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [
    currentSearch,
    currentCategory,
    currentMinPrice,
    currentMaxPrice,
    currentPage,
    currentSortBy,
    currentSortOrder,
    currentLimit,
  ]);

  // Handle filter changes
  const updateFilters = (newFilters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.set("page", "1");
    router.push(`/medicines?${params.toString()}`);
  };

  const handleSearch = (searchTerm: string) => {
    updateFilters({ search: searchTerm });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/medicines?${params.toString()}`);
  };

  const sortOptions = [
    { value: "createdAt:desc", label: "Newest First" },
    { value: "createdAt:asc", label: "Oldest First" },
    { value: "price:asc", label: "Price: Low to High" },
    { value: "price:desc", label: "Price: High to Low" },
    { value: "name:asc", label: "Name: A to Z" },
    { value: "name:desc", label: "Name: Z to A" },
    { value: "rating:desc", label: "Highest Rated" },
  ];

  const activeFilterCount = [currentSearch, currentCategory, currentMinPrice, currentMaxPrice].filter(Boolean).length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Medicines</h1>
        <p className="text-muted-foreground">
          Browse our collection of {total} medicine{total !== 1 ? "s" : ""}
        </p>
        {pagination && (
          <p className="text-muted-foreground/70 text-sm mt-1">
            Page {pagination.page} of {pagination.totalPages}
          </p>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSearch(formData.get("search") as string);
            }}
            className="flex-1 relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              name="search"
              type="text"
              defaultValue={currentSearch}
              placeholder="Search medicines by name, brand, or description..."
              className="w-full pl-11 pr-20 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Sort */}
          <select
            value={`${currentSortBy}:${currentSortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split(":");
              updateFilters({ sortBy, sortOrder });
            }}
            className="px-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-blue-500 text-sm min-w-[180px]"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Toggle Filters */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 border rounded-xl text-sm font-medium transition-colors ${
              showFilters || activeFilterCount > 0
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                : "border-border hover:bg-muted"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="p-4 bg-muted/50 rounded-xl border space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium mb-1.5 block">Category</label>
                <select
                  value={currentCategory}
                  onChange={(e) => updateFilters({ category: e.target.value })}
                  className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Min Price */}
              <div>
                <label className="text-sm font-medium mb-1.5 block">Min Price ($)</label>
                <input
                  type="number"
                  value={currentMinPrice}
                  onChange={(e) => updateFilters({ minPrice: e.target.value })}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-sm"
                />
              </div>

              {/* Max Price */}
              <div>
                <label className="text-sm font-medium mb-1.5 block">Max Price ($)</label>
                <input
                  type="number"
                  value={currentMaxPrice}
                  onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                  placeholder="Any"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2.5 border border-border rounded-lg bg-background text-sm"
                />
              </div>
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={() => router.push("/medicines")}
                className="text-sm text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Active Filters Pills */}
        {activeFilterCount > 0 && !showFilters && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Active:</span>
            {currentSearch && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full text-sm text-blue-700 dark:text-blue-300">
                Search: {currentSearch}
                <button onClick={() => updateFilters({ search: "" })} className="hover:text-blue-900 dark:hover:text-blue-100">×</button>
              </span>
            )}
            {currentCategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-full text-sm text-purple-700 dark:text-purple-300">
                Category: {currentCategory}
                <button onClick={() => updateFilters({ category: "" })} className="hover:text-purple-900 dark:hover:text-purple-100">×</button>
              </span>
            )}
            {(currentMinPrice || currentMaxPrice) && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-full text-sm text-emerald-700 dark:text-emerald-300">
                Price: ${currentMinPrice || "0"} - ${currentMaxPrice || "∞"}
                <button onClick={() => updateFilters({ minPrice: "", maxPrice: "" })} className="hover:text-emerald-900 dark:hover:text-emerald-100">×</button>
              </span>
            )}
            <button
              onClick={() => router.push("/medicines")}
              className="text-sm text-red-600 dark:text-red-400 hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <MedicineGridSkeleton count={12} />
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-500 dark:text-red-400 text-lg mb-4">{error}</div>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      ) : (
        <MedicineComponent medicines={medicines} />
      )}

      {/* Pagination */}
      {!loading && pagination && pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="px-4 py-2 border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors text-sm"
            >
              Previous
            </button>

            {Array.from(
              { length: Math.min(5, pagination.totalPages) },
              (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (pagination.page <= 3) {
                  pageNum = i + 1;
                } else if (pagination.page >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = pagination.page - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                      pagination.page === pageNum
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              },
            )}

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="px-4 py-2 border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors text-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicinePage;
