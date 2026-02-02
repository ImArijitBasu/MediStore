// components/medicines/MedicineReviews.tsx

import { ReviewServices } from "@/services/reviews.service";
import { format } from "date-fns";

interface MedicineReviewsProps {
  medicineId: string;
}

export default async function MedicineReviews({
  medicineId,
}: MedicineReviewsProps) {
  // Fetch reviews for this medicine
  const reviewsResult = await ReviewServices.getMedicineReviews(medicineId, {
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  if (!reviewsResult.success) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Customer Reviews
        </h2>
        <div className="text-center py-8">
          <div className="text-red-500 mb-4">Error loading reviews</div>
          <p className="text-gray-500">{reviewsResult.error}</p>
        </div>
      </div>
    );
  }

  const reviews = reviewsResult.data;
  const averageRating = reviewsResult.averageRating;
  const totalReviews = reviewsResult.total;
  const ratingDistribution = reviewsResult.ratingDistribution;

  // Calculate star percentages for the rating distribution
  const getStarPercentage = (star: number) => {
    if (!ratingDistribution || !totalReviews) return 0;
    const count = ratingDistribution[star] || 0;
    return totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
  };

  // Render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mt-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-6 mb-8 p-4 bg-blue-50 rounded-lg">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-800">
            {averageRating.toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">Average Rating</div>
          <div className="mt-2">{renderStars(Math.round(averageRating))}</div>
          <div className="text-sm text-gray-500 mt-1">
            {totalReviews} reviews
          </div>
        </div>

        <div className="flex-1">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-6">{star} stars</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${getStarPercentage(star)}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-10">
                  {getStarPercentage(star)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review: any) => (
            <div
              key={review.id}
              className="border-b border-gray-100 pb-6 last:border-0"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {review.user?.name || "Anonymous"}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500">
                      {format(new Date(review.createdAt), "MMM d, yyyy")}
                    </span>
                    {review.isVerified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {review.comment && (
                <p className="text-gray-600 mt-2">{review.comment}</p>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-300 text-5xl mb-4">💬</div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-500 mb-4">
              Be the first to share your experience with this medicine
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
