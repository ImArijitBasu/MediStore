// components/dashboard/admin/CategoryList.tsx
"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Edit2, Trash2, Check, X, Pill, Loader2 } from "lucide-react";

import { toast } from "sonner";
import {
  deleteCategoryAction,
  updateCategoryAction,
} from "@/actions/admin.action";

export function CategoryList({
  initialCategories = [],
}: {
  initialCategories: any[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return toast.error("Name cannot be empty");

    setIsPending(true);
    const res = await updateCategoryAction(id, editName);
    if (res.success) {
      toast.success("Category updated");
      setEditingId(null);
    } else {
      toast.error(res.message);
    }
    setIsPending(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This may affect medicines in this category."))
      return;

    setIsPending(true);
    const res = await deleteCategoryAction(id);
    if (res.success) toast.success("Category deleted");
    else toast.error(res.message);
    setIsPending(false);
  };

  return (
    <Card className="border-border/50 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="pl-6">Category Name</TableHead>
            <TableHead>Medicines</TableHead>
            <TableHead className="text-right pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialCategories.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center py-10 text-muted-foreground"
              >
                No categories found. Create one to get started.
              </TableCell>
            </TableRow>
          ) : (
            initialCategories.map((cat) => (
              <TableRow
                key={cat.id}
                className="hover:bg-muted/5 transition-colors"
              >
                <TableCell className="font-medium pl-6">
                  {editingId === cat.id ? (
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-9 w-64 focus-visible:ring-indigo-500"
                      autoFocus
                      disabled={isPending}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleUpdate(cat.id)
                      }
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-900">{cat.name}</span>
                    </div>
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Pill className="h-3.5 w-3.5" />
                    <span className="font-bold text-slate-700">
                      {cat.medicineCount || 0}
                    </span>
                    Items
                  </div>
                </TableCell>

                <TableCell className="text-right space-x-2 pr-6">
                  {editingId === cat.id ? (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                        onClick={() => handleUpdate(cat.id)}
                        disabled={isPending}
                      >
                        {isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2 text-slate-400 hover:text-slate-600"
                        onClick={() => setEditingId(null)}
                        disabled={isPending}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"
                        onClick={() => {
                          setEditingId(cat.id);
                          setEditName(cat.name);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2 text-slate-500 hover:text-destructive hover:bg-red-50"
                        onClick={() => handleDelete(cat.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
