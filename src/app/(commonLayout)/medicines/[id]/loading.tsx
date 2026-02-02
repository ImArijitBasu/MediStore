export default function MedicineLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-pulse">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs Skeleton */}
        <div className="h-4 w-64 bg-gray-200 rounded mb-6"></div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="md:flex">
            {/* Left Side: Image Skeleton */}
            <div className="md:w-2/5 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-100">
              <div className="h-64 md:h-80 bg-gray-100 rounded-lg mb-6"></div>
              <div className="space-y-4">
                <div className="h-8 w-1/2 bg-gray-100 rounded-full"></div>
                <div className="h-8 w-3/4 bg-gray-100 rounded-full"></div>
                <div className="h-4 w-full bg-gray-100 rounded"></div>
              </div>
            </div>

            {/* Right Side: Info Skeleton */}
            <div className="md:w-3/5 p-6 md:p-8">
              {/* Title & Brand */}
              <div className="h-10 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 w-1/2 bg-gray-100 rounded mb-6"></div>

              {/* Rating */}
              <div className="flex gap-2 mb-8">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 bg-gray-200 rounded-full"
                  ></div>
                ))}
                <div className="h-5 w-20 bg-gray-100 rounded"></div>
              </div>

              {/* Description */}
              <div className="space-y-2 mb-8">
                <div className="h-4 w-full bg-gray-100 rounded"></div>
                <div className="h-4 w-full bg-gray-100 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
              </div>

              {/* Price Box */}
              <div className="h-24 w-full bg-gray-50 rounded-lg border border-gray-100 mb-8"></div>

              {/* Sellers List */}
              <div className="space-y-4">
                <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
                <div className="h-20 w-full bg-gray-50 rounded-lg border border-gray-100"></div>
                <div className="h-20 w-full bg-gray-50 rounded-lg border border-gray-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
