// components/home/FeaturedMedicinesSkeleton.tsx
export const FeaturedMedicinesSkeleton = () => {
  return (
    <section className="py-12 bg-linear-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className="text-center mb-10">
          <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 max-w-full mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-80 max-w-full mx-auto animate-pulse"></div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Medicines Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse"
            >
              {/* Image Skeleton */}
              <div className="h-48 bg-gray-200"></div>

              {/* Content Skeleton */}
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-10"></div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                  <div className="h-5 bg-gray-200 rounded w-10"></div>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 h-8 bg-gray-200 rounded"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button Skeleton */}
        <div className="text-center mt-10">
          <div className="inline-block h-12 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
