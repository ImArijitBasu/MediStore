"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createMedicineAction } from "@/actions/seller.action";


interface Category {
  id: string;
  name: string;
}

export default function AddMedicineForm({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
console.log(categories);
  const form = useForm({
    defaultValues: {
      name: "",
      brandName: "",
      genericName: "",
      price: 0,
      stockQuantity: 0,
      description: "",
      isOtc: true,
      categoryId: "",
    },
    onSubmit: async ({ value }) => {
      const result = await createMedicineAction(value);
      if (result.success) {
        toast.success("Medicine added successfully!");
        router.push("/seller-dashboard/inventory");
      } else {
        toast.error(result.message || "Failed to add medicine");
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/seller-dashboard/inventory">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add New Medicine</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Medicine Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field
              name="categoryId"
              children={(field) => (
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    onValueChange={field.handleChange}
                    defaultValue={field.state.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <form.Field
              name="name"
              children={(field) => (
                <div className="space-y-2">
                  <Label>Medicine Name</Label>
                  <Input
                    placeholder="Napa Extend"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <form.Field
              name="brandName"
              children={(field) => (
                <div className="space-y-2">
                  <Label>Brand Name</Label>
                  <Input
                    placeholder="Beximco"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            />

            <form.Field
              name="genericName"
              children={(field) => (
                <div className="space-y-2">
                  <Label>Generic Name</Label>
                  <Input
                    placeholder="Paracetamol"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field
              name="price"
              children={(field) => (
                <div className="space-y-2">
                  <Label>Price (৳)</Label>
                  <Input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                </div>
              )}
            />
            <form.Field
              name="stockQuantity"
              children={(field) => (
                <div className="space-y-2">
                  <Label>Initial Stock</Label>
                  <Input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                </div>
              )}
            />
          </div>

          <form.Field
            name="description"
            children={(field) => (
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />

          <form.Field
            name="isOtc"
            children={(field) => (
              <div className="flex items-center gap-2 py-2">
                <Switch
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                />
                <Label>OTC Medicine (No Prescription Required)</Label>
              </div>
            )}
          />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Medicine
                </Button>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
