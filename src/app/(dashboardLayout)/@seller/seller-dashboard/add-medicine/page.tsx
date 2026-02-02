
import AddMedicineForm from "@/components/dashboard/seller/AddMedicineForm";
import { CategoryServices } from "@/services/category.service";


export default async function AddMedicinePage() {

  const response = await CategoryServices.getAllCategories();
  const categories = response.data || [];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <AddMedicineForm categories={categories.categories} />
    </div>
  );
}
