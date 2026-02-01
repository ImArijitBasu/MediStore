// src/app/(commonLayout)/medicines/page.tsx
"use client";

import MedicineComponent from "@/components/medicines/MedicineComponent";
import { MedicineServices } from "@/services/medicine.service";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/layout/loadingSpinner";


const MedicinePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState<any>(null);
  const [filters, setFilters] = useState<any>(null);

  // Get current filters from URL
  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentManufacturer = searchParams.get("manufacturer") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentPage = searchParams.get("page") || "1";
  const currentSortBy = searchParams.get("sortBy") || "createdAt";
  const currentSortOrder = searchParams.get("sortOrder") || "desc";
  const currentLimit = searchParams.get("limit") || "12";

  // Fetch medicines with filters
  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await MedicineServices.getAllMedicines({
          search: currentSearch || undefined,
          category: currentCategory || undefined,
          manufacturer: currentManufacturer || undefined,
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
    currentManufacturer,
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

    // Update or remove filters
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Reset to page 1 when filters change
    params.set("page", "1");

    router.push(`/medicines?${params.toString()}`);
  };

  // Handle search
  const handleSearch = (searchTerm: string) => {
    updateFilters({ search: searchTerm });
  };

  // Handle category filter
  const handleCategoryChange = (category: string) => {
    updateFilters({ category });
  };

  // Handle price range filter
  const handlePriceRangeChange = (min: string, max: string) => {
    updateFilters({ minPrice: min, maxPrice: max });
  };

  // Handle sort change
  const handleSortChange = (sortBy: string, sortOrder: string) => {
    updateFilters({ sortBy, sortOrder });
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    updateFilters({ page: page.toString() });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="large" text="Loading medicines..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <p className="text-gray-400">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with stats */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Medicines</h1>
        <p className="text-gray-600">
          Browse our collection of {total} medicine{total !== 1 ? "s" : ""}
        </p>
        {pagination && (
          <p className="text-gray-400 text-sm mt-1">
            Page {pagination.page} of {pagination.totalPages}
          </p>
        )}
      </div>

      {/* Filter Component */}
      <MedicineFilters
        currentSearch={currentSearch}
        currentCategory={currentCategory}
        currentManufacturer={currentManufacturer}
        currentMinPrice={currentMinPrice}
        currentMaxPrice={currentMaxPrice}
        currentSortBy={currentSortBy}
        currentSortOrder={currentSortOrder}
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onPriceRangeChange={handlePriceRangeChange}
        onSortChange={handleSortChange}
      />

      {/* Active filters display */}
      {filters?.applied && Object.keys(filters.applied).length > 0 && (
        <div className="mb-6 p-3 bg-blue-50 rounded-lg">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Active filters:
            </span>
            {Object.entries(filters.applied)
              .filter(([_, value]) => value !== undefined && value !== "")
              .map(([key, value]) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-blue-200 rounded-full text-sm text-blue-700"
                >
                  {key}: {String(value)}
                  <button
                    onClick={() => updateFilters({ [key]: "" })}
                    className="text-blue-400 hover:text-blue-600 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            <button
              onClick={() => {
                // Clear all filters
                router.push("/medicines");
              }}
              className="text-sm text-red-600 hover:text-red-800 ml-auto"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      {/* Medicines Grid */}
      <MedicineComponent medicines={medicines} />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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
                    className={`px-4 py-2 border rounded-lg ${
                      pagination.page === pageNum
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 hover:bg-gray-50"
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
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Filter Component
const MedicineFilters = ({
  currentSearch,
  currentCategory,
  currentManufacturer,
  currentMinPrice,
  currentMaxPrice,
  currentSortBy,
  currentSortOrder,
  onSearch,
  onCategoryChange,
  onPriceRangeChange,
  onSortChange,
}: {
  currentSearch: string;
  currentCategory: string;
  currentManufacturer: string;
  currentMinPrice: string;
  currentMaxPrice: string;
  currentSortBy: string;
  currentSortOrder: string;
  onSearch: (term: string) => void;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (min: string, max: string) => void;
  onSortChange: (sortBy: string, sortOrder: string) => void;
}) => {
  const [searchInput, setSearchInput] = useState(currentSearch);

  const sortOptions = [
    { value: "createdAt:desc", label: "Newest First" },
    { value: "createdAt:asc", label: "Oldest First" },
    { value: "price:asc", label: "Price: Low to High" },
    { value: "price:desc", label: "Price: High to Low" },
    { value: "name:asc", label: "Name: A to Z" },
    { value: "name:desc", label: "Name: Z to A" },
    { value: "rating:desc", label: "Highest Rated" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const min = (form.elements.namedItem("minPrice") as HTMLInputElement).value;
    const max = (form.elements.namedItem("maxPrice") as HTMLInputElement).value;
    onPriceRangeChange(min, max);
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Search Bar */}
      <div className="flex gap-4">
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search medicines by name, brand, or description..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute left-4 top-3.5 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              type="submit"
              className="absolute right-2 top-2 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </form>

        {/* Sort Dropdown */}
        <div className="w-64">
          <select
            value={`${currentSortBy}:${currentSortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split(":");
              onSortChange(sortBy, sortOrder);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Filter */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-700 mb-3">Price Range</h3>
        <form onSubmit={handlePriceSubmit} className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">$</span>
            <input
              type="number"
              name="minPrice"
              defaultValue={currentMinPrice}
              placeholder="Min"
              min="0"
              step="0.01"
              className="w-32 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <span className="text-gray-400">to</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">$</span>
            <input
              type="number"
              name="maxPrice"
              defaultValue={currentMaxPrice}
              placeholder="Max"
              min="0"
              step="0.01"
              className="w-32 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Apply
          </button>
          {currentMinPrice && (
            <button
              type="button"
              onClick={() => onPriceRangeChange("", "")}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default MedicinePage;
