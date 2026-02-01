import React from "react";
import { Medicine } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface MedicineCardProps {
  medicine: Medicine;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
  const bestSeller = medicine.sellers?.[0];
  const price = bestSeller?.price || 0;
  const stockQuantity = bestSeller?.stockQuantity || 0;
  const discount = bestSeller?.discount || 0;

  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;
  const isInStock = stockQuantity > 0 && medicine.isActive;
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(medicine.rating);
    const hasHalfStar = medicine.rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id="half-gradient">
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half-gradient)"
              d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            />
          </svg>,
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-gray-300 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>,
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-100">
      <div className="px-4 pt-4 pb-2">
        <div className="flex justify-between items-start">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
            {medicine.category?.name || "Uncategorized"}
          </span>

          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              medicine.isOtc
                ? "bg-green-50 text-green-700"
                : "bg-purple-50 text-purple-700"
            }`}
          >
            {medicine.isOtc ? "OTC" : "Rx"}
          </span>
        </div>
      </div>
      <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center relative">
        {medicine.thumbnail ? (
          <div className="relative w-32 h-32">
            <Image
              src={medicine.thumbnail}
              alt={medicine.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-inner border border-gray-100">
              <span className="text-3xl font-bold text-blue-400">💊</span>
            </div>
            <p className="mt-3 text-gray-500 text-sm font-medium">
              {medicine.brandName}
            </p>
          </div>
        )}

        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isInStock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isInStock ? `${stockQuantity} in stock` : "Out of Stock"}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
            {medicine.name}
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-600">
              {medicine.brandName}
            </span>
            {medicine.genericName && (
              <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
                {medicine.genericName}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">{renderStars()}</div>
            <span className="text-sm text-gray-500">
              ({medicine.rating.toFixed(1)})
            </span>
            <span className="text-sm text-gray-400">
              • {medicine._count?.reviews || 0} reviews
            </span>
          </div>

          {medicine.description && (
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {medicine.description}
            </p>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Available from:</span>
            <span className="text-sm font-medium text-gray-700">
              {medicine.sellers?.length || 0} seller
              {medicine.sellers?.length !== 1 ? "s" : ""}
            </span>
          </div>

          {medicine.sellers?.slice(0, 2).map((sellerInfo, index) => (
            <div
              key={sellerInfo.id}
              className="flex items-center justify-between text-sm mb-1"
            >
              <span className="text-gray-600 truncate pr-2">
                {index + 1}. {sellerInfo.seller?.name}
              </span>
              <span className="font-medium text-gray-800 whitespace-nowrap">
                ${sellerInfo.price.toFixed(2)}
              </span>
            </div>
          ))}

          {medicine.sellers?.length && medicine.sellers.length > 2 && (
            <div className="text-xs text-gray-400 mt-1">
              +{medicine.sellers.length - 2} more seller
              {medicine.sellers.length - 2 !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-800">
                  ${discountedPrice.toFixed(2)}
                </span>

                {discount > 0 && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      ${price.toFixed(2)}
                    </span>
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-1">Per unit</div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to Cart
            </button>

            <Link
              href={`/medicines/${medicine.slug}`}
              className="px-4 py-2 border border-blue-600 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center"
              title="View Details"
            >
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Added {new Date(medicine.createdAt).toLocaleDateString()}
            </span>
            <span
              className={`flex items-center gap-1 ${
                medicine.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  medicine.isActive ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              {medicine.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
