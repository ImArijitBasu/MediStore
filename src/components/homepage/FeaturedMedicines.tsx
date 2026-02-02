// components/home/FeaturedMedicines.tsx
import { MedicineServices } from "@/services/medicine.service";
import Link from "next/link";
import Image from "next/image";

const FeaturedMedicines = async () => {
  const featuredResult = await MedicineServices.getFeaturedMedicines(5);

  const featuredMedicines = featuredResult?.data?.data?.medicines;

  if (featuredMedicines.length === 0) {
    return (
      <div className="text-red-500 font-extrabold text-xl p-10 mx-auto">
        Network connection error
        <span className="text-xs px-5">Please try again later</span>
      </div>
    );
  }

  // Function to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg
            key={i}
            className="w-3 h-3 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg
            key={i}
            className="w-3 h-3 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id="half-gradient">
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#374151" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half-gradient)"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>,
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-3 h-3 text-gray-500 dark:text-gray-600 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>,
        );
      }
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <section className="py-12 bg-linear-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Featured Medicines
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our top-rated medicines trusted by customers. All products
            are verified and sourced from reliable sellers.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-8 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
            <div className="w-3 h-1 bg-blue-400 dark:bg-blue-400 rounded-full"></div>
            <div className="w-3 h-1 bg-blue-300 dark:bg-blue-300 rounded-full"></div>
          </div>
        </div>

        {/* Medicines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredMedicines.slice(0, 8).map((medicine: any) => {
            const bestSeller = medicine.sellers?.[0];
            const price = bestSeller?.price || 0;
            const discount = bestSeller?.discount || 0;
            const discountedPrice =
              discount > 0 ? price * (1 - discount / 100) : price;
            const stockQuantity = bestSeller?.stockQuantity || 0;
            const isInStock = stockQuantity > 0 && medicine.isActive;

            return (
              <div
                key={medicine.id}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl dark:shadow-gray-900/30 dark:hover:shadow-gray-900/50 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500/30"
              >
                {/* Medicine Image */}
                <div className="relative h-48 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
                  {medicine.thumbnail ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={medicine.thumbnail}
                        alt={medicine.name}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-inner border border-gray-100 dark:border-gray-600 mb-3">
                        <span className="text-4xl text-blue-400 dark:text-blue-300">
                          💊
                        </span>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        {medicine.brandName}
                      </p>
                    </div>
                  )}

                  {/* Discount Badge */}
                  {discount > 0 && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-red-500 dark:bg-red-600 text-white text-xs font-bold rounded">
                        {discount}% OFF
                      </span>
                    </div>
                  )}

                  {/* Stock Status */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isInStock
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                          : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                      }`}
                    >
                      {isInStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-medium rounded">
                      {medicine.category?.name || "Medicine"}
                    </span>
                  </div>
                </div>

                {/* Medicine Details */}
                <div className="p-4">
                  {/* Name & Brand */}
                  <div className="mb-3">
                    <h3 className="font-bold text-gray-800 dark:text-white text-sm line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {medicine.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      {medicine.brandName}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    {renderStars(medicine.rating || 0)}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({medicine.rating?.toFixed(1) || "0.0"})
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      • {medicine._count?.reviews || 0} reviews
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-800 dark:text-white">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      {discount > 0 && (
                        <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                          ${price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        medicine.isOtc
                          ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      }`}
                    >
                      {medicine.isOtc ? "OTC" : "Rx"}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      href={`/medicines/${medicine.id}`}
                      className="flex-1 px-3 py-2 bg-blue-600 dark:bg-blue-700 text-white text-xs font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        {featuredMedicines.length > 0 && (
          <div className="text-center mt-10">
            <Link
              href="/medicines"
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-gray-900/50"
            >
              <span>View All Medicines</span>
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
        )}
      </div>
    </section>
  );
};

export default FeaturedMedicines;
