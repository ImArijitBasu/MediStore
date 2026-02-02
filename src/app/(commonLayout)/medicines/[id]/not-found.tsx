import Link from "next/link";

export default function MedicineNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <span className="text-6xl mb-4 block">🧪</span>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Medicine Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We couldn't find the medication you're looking for. It may have been
          discontinued or moved to a different category.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/medicines"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Browse All Medicines
          </Link>
          <Link
            href="/medicines"
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
          >
            Search Pharmacy
          </Link>
        </div>
      </div>
    </div>
  );
}
