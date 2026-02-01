// MedicinePage.tsx
import MedicineComponent from "@/components/medicines/MedicineComponent";
import { MedicineServices } from "@/services/medicine.service";
import React from "react";

const MedicinePage = async () => {
  const response = await MedicineServices.getAllMedicines();

  // Response structure from your console:
  // { success: true, message: '...', data: Array(3), total: 3, pagination: {...}, ... }

  if (!response.success || !response.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-red-500 text-lg mb-4">
            {response.message || "Failed to load medicines"}
          </div>
          <p className="text-gray-400">Please try again later.</p>
        </div>
      </div>
    );
  }

  const medicines = response.data; // response.data is already the array

  // Handle empty medicines array
  if (medicines.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Medicines</h1>
          <p className="text-gray-600">No medicines found in our collection</p>
        </div>

        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-gray-500 text-lg mb-4">
            No medicines available
          </div>
          <p className="text-gray-400">Check back later for new additions.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Medicines</h1>
        <p className="text-gray-600">
          Browse our collection of {medicines.length} medicine
          {medicines.length !== 1 ? "s" : ""}
        </p>

        {/* Display pagination info if available */}
        {response.pagination && response.pagination.totalPages > 1 && (
          <p className="text-gray-400 text-sm mt-1">
            Page {response.pagination.page} of {response.pagination.totalPages}{" "}
            • Showing {Math.min(response.pagination.limit, medicines.length)} of{" "}
            {response.total} total medicines
          </p>
        )}

        {/* Display filters if applied */}
        {response.filters?.applied &&
          Object.keys(response.filters.applied).length > 0 && (
            <div className="mt-2">
              <p className="text-gray-500 text-sm">
                Filters:{" "}
                {Object.entries(response.filters.applied)
                  .filter(([key, value]) => value !== undefined && value !== "")
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(", ")}
              </p>
            </div>
          )}
      </div>

      <MedicineComponent medicines={medicines} />
    </div>
  );
};

export default MedicinePage;
