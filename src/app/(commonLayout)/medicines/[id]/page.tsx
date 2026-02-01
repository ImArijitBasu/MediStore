// app/medicines/[id]/page.tsx
import { MedicineServices } from "@/services/medicine.service";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import MedicineReviews from "@/components/medicines/MedicineReviews";

interface MedicineDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function MedicineDetailsPage({
  params,
}: MedicineDetailsPageProps) {

    const { id } = await params;
  const medicineResult = await MedicineServices.getMedicineById(id);

  // Check if successful and has data
  if (!medicineResult.success || !medicineResult.data) {
    notFound();
  }

  const medicine = medicineResult.data;

  // If medicine is still a string, parse it
  const medicineData =
    typeof medicine === "string" ? JSON.parse(medicine) : medicine;

  // Safe access to properties with fallbacks
  const bestSeller = medicineData.sellers?.[0];
  const price = bestSeller?.price || 0;
  const stockQuantity = bestSeller?.stockQuantity || 0;
  const discount = bestSeller?.discount || 0;
  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;
  const isInStock = stockQuantity > 0 && medicineData.isActive;
  const rating = medicineData.rating || 0;
  const reviewCount = medicineData._count?.reviews || 0;

  // Generate rating stars
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400 fill-current"
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
            className="w-5 h-5 text-gray-300 fill-current"
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <ol className="flex flex-wrap items-center space-x-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link
                href="/medicines"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Medicines
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600 truncate max-w-xs md:max-w-md">
              {medicineData.name || "Medicine"}
            </li>
          </ol>
        </nav>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="md:flex">
            {/* Left Column - Image & Basic Info */}
            <div className="md:w-2/5 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-100">
              {/* Medicine Image */}
              <div className="mb-6">
                <div className="h-64 md:h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center relative">
                  {medicineData.thumbnail ? (
                    <div className="relative w-48 h-48 md:w-56 md:h-56">
                      <Image
                        src={medicineData.thumbnail}
                        alt={medicineData.name || "Medicine"}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 400px"
                        priority
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-40 h-40 md:w-48 md:h-48 mx-auto bg-white rounded-full flex items-center justify-center shadow-inner border border-gray-100">
                        <span className="text-5xl md:text-6xl font-bold text-blue-400">
                          💊
                        </span>
                      </div>
                      <p className="mt-4 text-gray-500 text-lg font-medium">
                        {medicineData.brandName || medicineData.name}
                      </p>
                    </div>
                  )}

                  {/* Stock Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${isInStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {isInStock ? `${stockQuantity} in stock` : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Category & Type Badges */}
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Category</span>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                      {medicineData.category?.name || "Uncategorized"}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-gray-500">Medicine Type</span>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${medicineData.isOtc ? "bg-green-50 text-green-700" : "bg-purple-50 text-purple-700"}`}
                    >
                      {medicineData.isOtc
                        ? "Over-the-Counter (OTC)"
                        : "Prescription Required (Rx)"}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Status:</span>
                  <span
                    className={`flex items-center gap-1.5 text-sm font-medium ${medicineData.isActive ? "text-green-600" : "text-red-600"}`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${medicineData.isActive ? "bg-green-500" : "bg-red-500"}`}
                    />
                    {medicineData.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Added Date */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
                  <span className="flex items-center gap-1.5">
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Added on
                  </span>
                  <span>
                    {new Date(medicineData.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="md:w-3/5 p-6 md:p-8">
              {/* Medicine Header */}
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {medicineData.name}
                </h1>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-lg font-medium text-gray-700">
                    {medicineData.brandName}
                  </span>
                  {medicineData.genericName && (
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      Generic: {medicineData.genericName}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center">{renderStars()}</div>
                  <span className="text-gray-600">({rating.toFixed(1)})</span>
                  <span className="text-gray-400">• {reviewCount} reviews</span>
                </div>
              </div>

              {/* Description */}
              {medicineData.description && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {medicineData.description}
                  </p>
                </div>
              )}

              {/* Price & Add to Cart */}
              <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Price Display */}
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-3xl font-bold text-gray-800">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      {discount > 0 && (
                        <>
                          <span className="text-lg text-gray-400 line-through">
                            ${price.toFixed(2)}
                          </span>
                          <span className="px-2.5 py-1 bg-red-100 text-red-700 text-sm font-bold rounded">
                            {discount}% OFF
                          </span>
                        </>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      Per unit • Free shipping
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="flex-shrink-0">
                    <button className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2">
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
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Sellers Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Available from {medicineData.sellers?.length || 0} seller
                  {medicineData.sellers?.length !== 1 ? "s" : ""}
                </h3>

                {medicineData.sellers?.length > 0 ? (
                  <div className="space-y-4">
                    {medicineData.sellers?.map(
                      (sellerInfo: any, index: number) => (
                        <div
                          key={sellerInfo.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
                        >
                          <div className="mb-3 sm:mb-0">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-medium text-sm">
                                  {index + 1}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-800">
                                  {sellerInfo.seller?.name || "Unknown Seller"}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {sellerInfo.stockQuantity > 0
                                    ? `${sellerInfo.stockQuantity} units available`
                                    : "Out of stock"}
                                </p>
                              </div>
                            </div>
                            {sellerInfo.discount > 0 && (
                              <div className="ml-11">
                                <span className="text-sm text-red-600 font-medium">
                                  {sellerInfo.discount}% discount available
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="flex items-center justify-end gap-2 mb-2">
                              {sellerInfo.discount > 0 ? (
                                <>
                                  <span className="text-xl font-bold text-gray-900">
                                    $
                                    {(
                                      sellerInfo.price *
                                      (1 - sellerInfo.discount / 100)
                                    ).toFixed(2)}
                                  </span>
                                  <span className="text-gray-400 line-through text-sm">
                                    ${sellerInfo.price.toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                <span className="text-xl font-bold text-gray-900">
                                  ${sellerInfo.price.toFixed(2)}
                                </span>
                              )}
                            </div>
                            {sellerInfo.stockQuantity > 0 ? (
                              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                Buy from this seller
                              </button>
                            ) : (
                              <span className="px-4 py-2 bg-gray-100 text-gray-500 text-sm font-medium rounded-lg">
                                Out of stock
                              </span>
                            )}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No sellers available for this medicine.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
              </div>
              <MedicineReviews medicineId={id}/>

        {/* Back to Medicines Link */}
        <div className="mt-8 text-center">
          <Link
            href="/medicines"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to All Medicines
          </Link>
        </div>
      </div>
    </div>
  );
}


