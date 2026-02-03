// app/admin/categories/page.tsx
import { CategoryServices } from "@/services/category.service";
import { CategoryList } from "@/components/dashboard/admin/CategoryList";
import { CreateCategoryDialog } from "@/components/dashboard/admin/CreateCategoryDialog";
import { Layers, ListFilter, Search, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default async function AdminCategoriesPage() {
  const response = await CategoryServices.getAllCategories();
  const categories = response?.data?.categories || [];

  const totalMedicines = categories.reduce(
    (acc: number, cat: any) => acc + (cat.medicineCount || 0),
    0,
  );

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto bg-slate-50/50 min-h-screen">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Layers className="h-5 w-5 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Medicine Categories
          </h1>
          <p className="text-slate-500 mt-2 max-w-md">
            Manage your pharmacy taxonomy. Categories help customers find the
            right medicine faster.
          </p>
        </div>
        <CreateCategoryDialog />
      </div>

      {/* 2. Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-full">
              <ListFilter className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">
                Active Categories
              </p>
              <h3 className="text-2xl font-bold">{categories.length}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-full">
              <Database className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Products Linked
              </p>
              <h3 className="text-2xl font-bold">{totalMedicines}</h3>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder for empty space or additional metric */}
        <div className="hidden md:block" />
      </div>

      {/* 3. Main Content Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-semibold text-slate-800">
            All Categories
          </h2>
          <div className="text-xs text-slate-400 font-medium">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        <CategoryList initialCategories={categories} />
      </div>
    </div>
  );
}
