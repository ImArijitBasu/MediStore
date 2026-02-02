// components/admin/AdminProfileForm.tsx
"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Loader2, User, Mail, ShieldAlert, Fingerprint } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AdminProfileForm({
  initialData,
}: {
  initialData: any;
}) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: initialData?.name || "",
    },
    onSubmit: async ({ value }) => {
      const { data, error } = await authClient.updateUser({
        name: value.name,
      });

      if (error) {
        toast.error(error.message || "Failed to update admin profile");
      } else {
        toast.success("Identity updated successfully");
        router.refresh();
      }
    },
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Fingerprint className="h-5 w-5 text-blue-600" />
              Administrative Identity
            </CardTitle>
            <CardDescription>
              Update how your name appears in audit logs and system reports.
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <form.Field
                  name="name"
                  children={(field) => (
                    <div className="space-y-2">
                      <Label
                        htmlFor={field.name}
                        className="text-xs font-bold uppercase text-muted-foreground"
                      >
                        Admin Display Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/70" />
                        <Input
                          id={field.name}
                          className="pl-9 h-11 focus-visible:ring-blue-500/20"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                />

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground">
                    Secure Email
                  </Label>
                  <div className="relative opacity-60">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/70" />
                    <Input
                      value={initialData?.email}
                      disabled
                      className="pl-9 h-11 bg-slate-50 border-dashed"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <form.Subscribe
                  selector={(state) => [
                    state.canSubmit,
                    state.isSubmitting,
                    state.isDirty,
                  ]}
                  children={([canSubmit, isSubmitting, isDirty]) => (
                    <Button
                      type="submit"
                      disabled={!canSubmit || isSubmitting || !isDirty}
                      className="bg-blue-600 hover:bg-blue-700 px-10 shadow-lg shadow-blue-500/20"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Update Identity"
                      )}
                    </Button>
                  )}
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-blue-50/50 border-blue-200/50 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-blue-800">
              <ShieldAlert className="h-4 w-4" />
              Admin Authority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-blue-700/80 leading-relaxed">
              You are currently logged in with <strong>Super Admin</strong>{" "}
              privileges. You can manage global categories, moderate users, and
              oversee all platform transactions.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">Account Meta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Status</span>
              <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 border-none shadow-none text-[10px]">
                System Active
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Role ID</span>
              <span className="text-[10px] font-mono font-bold bg-slate-100 px-2 py-0.5 rounded">
                {initialData?.role}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
