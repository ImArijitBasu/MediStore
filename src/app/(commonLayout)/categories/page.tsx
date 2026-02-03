// app/categories/page.tsx
import { CategoryServices } from "@/services/category.service";
import Link from "next/link";
import { Pill, ArrowRight, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default async function PublicCategoriesPage() {
  const response = await CategoryServices.getAllCategories();
  const categories = response?.data?.categories || [];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Simple Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-12 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-blue-600 font-bold mb-4">
              <Activity className="h-5 w-5" />
              <span className="uppercase tracking-widest text-xs">
                Medical Departments
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
              Find Medicine by <span className="text-blue-600">Category.</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Select a specialized category to filter our verified pharmacy
              inventory. Find exactly what you're looking for, from daily
              vitamins to specialized treatments.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="container mx-auto px-6 -mt-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category: any) => (
            <Card
              key={category.id}
              className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden bg-white"
            >
              <CardContent className="p-0">
                <div className="p-8">
                  {/* Visual Header */}
                  <div className="flex justify-between items-center mb-10">
                    <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                      <Pill className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
                      {category.medicineCount || 0} Products
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-400 mb-8 line-clamp-2">
                    View all available {category.name.toLowerCase()} medicines
                    and healthcare products.
                  </p>

                  {/* Redirection Button */}
                  <Link
                    href={`/medicines?category=${category.id}`}
                    className="flex items-center justify-between w-full py-3 px-4 bg-slate-50 group-hover:bg-blue-600 rounded-lg text-slate-600 group-hover:text-white font-bold text-sm transition-all"
                  >
                    Browse Collection
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fallback for No Data */}
        {categories.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-20 text-center">
            <p className="text-slate-400 font-medium">
              No categories have been listed yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
