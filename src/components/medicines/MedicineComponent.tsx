// MedicineComponent.tsx
import React from "react";
import { Medicine } from "@/types";
import MedicineCard from "./MedicineCard";


interface MedicineComponentProps {
  medicines: Medicine[];
}

const MedicineComponent: React.FC<MedicineComponentProps> = ({ medicines }) => {
  // Sort medicines by stock quantity and activity
  const sortedMedicines = [...medicines].sort((a, b) => {
    // First sort by active status
    if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;

    // Then sort by stock quantity
    const aStock = a.sellers?.[0]?.stockQuantity || 0;
    const bStock = b.sellers?.[0]?.stockQuantity || 0;
    return bStock - aStock;
  });

  // Check if medicines is empty
  if (!medicines || medicines.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">No medicines found</div>
        <p className="text-gray-400">Check back later for new additions.</p>
      </div>
    );
  }

  // Calculate stats - with null checks
  const totalStock = medicines.reduce((sum, med) => {
    return sum + (med.sellers?.[0]?.stockQuantity || 0);
  }, 0);

  const averageRating =
    medicines.length > 0
      ? medicines.reduce((sum, med) => sum + (med.rating || 0), 0) /
        medicines.length
      : 0;

  const otcCount = medicines.filter((m) => m.isOtc).length;
  const activeCount = medicines.filter((m) => m.isActive).length;

  return (
    <div>
      {/* Stats Bar */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {medicines.length}
            </div>
            <div className="text-sm text-gray-600">Total Medicines</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{totalStock}</div>
            <div className="text-sm text-gray-600">Total Stock</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {averageRating.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{otcCount}</div>
            <div className="text-sm text-gray-600">OTC Medicines</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {activeCount}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
        </div>
      </div>

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedMedicines.map((medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-600 text-sm">
          Showing {sortedMedicines.length} of {medicines.length} medicines •
          Sorted by: Availability & Stock
        </p>
        <p className="text-gray-400 text-xs mt-1">
          All medicines are verified and sourced from trusted sellers
        </p>
      </div>
    </div>
  );
};

export default MedicineComponent;
