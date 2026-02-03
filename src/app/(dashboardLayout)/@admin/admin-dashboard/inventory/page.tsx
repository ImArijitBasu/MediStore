import { MedicineTable } from "@/components/dashboard/admin/MedicineTable";
import { Pill } from "lucide-react";
import { MedicineServices } from "@/services/medicine.service";

export default async function AdminMedicinesPage() {
  const response = await MedicineServices.getAllMedicines();
  const medicines = response?.data || [];
console.log(medicines);
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Pill className="h-8 w-8 text-blue-600" /> Platform Inventory
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Overview of all medicines listed by sellers across the platform.
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-blue-600">
            {medicines.length}
          </span>
          <p className="text-[10px] uppercase font-bold text-muted-foreground">
            Total Listings
          </p>
        </div>
      </div>

      <MedicineTable medicines={medicines} />
    </div>
  );
}
