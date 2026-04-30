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
        <div className="text-muted-foreground text-lg mb-4">No medicines found</div>
        <p className="text-muted-foreground/70">Check back later for new additions.</p>
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
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {medicines.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Medicines</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{totalStock}</div>
            <div className="text-sm text-muted-foreground">Total Stock</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {averageRating.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{otcCount}</div>
            <div className="text-sm text-muted-foreground">OTC Medicines</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {activeCount}
            </div>
            <div className="text-sm text-muted-foreground">Active</div>
          </div>
        </div>
      </div>

      {/* Medicines Grid - 4 cards per row on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedMedicines.map((medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-8 p-4 bg-muted rounded-lg text-center">
        <p className="text-muted-foreground text-sm">
          Showing {sortedMedicines.length} of {medicines.length} medicines •
          Sorted by: Availability & Stock
        </p>
        <p className="text-muted-foreground/70 text-xs mt-1">
          All medicines are verified and sourced from trusted sellers
        </p>
      </div>
    </div>
  );
};

export default MedicineComponent;
