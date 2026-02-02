"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Loader2, User, Mail, ShieldCheck, CreditCard } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function ProfileForm({ initialData }: { initialData: any }) {
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
        toast.error(error.message || "Failed to update name");
      } else {
        toast.success("Profile updated successfully!");
        router.refresh();
      }
    },
  });

  return (
    <div className="grid gap-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-muted/30 p-6 rounded-xl border border-border/50">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
            {initialData?.image ? (
              <img
                src={initialData.image}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-primary" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{initialData?.name}</h2>
              <Badge
                variant="secondary"
                className="capitalize text-[10px] font-bold px-1.5 py-0"
              >
                {initialData?.role?.toLowerCase() || "user"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {initialData?.email}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-background">
            Account: {initialData?.status || "Active"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <CardDescription>
                Update your identity details across the pharmacy platform.
              </CardDescription>
            </CardHeader>
            <Separator className="mb-4" />
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
                className="space-y-6"
              >
                <div className="grid gap-4">
                  <form.Field
                    name="name"
                    children={(field) => (
                      <div className="space-y-2">
                        <Label
                          htmlFor={field.name}
                          className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                        >
                          Full Name
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/70" />
                          <Input
                            id={field.name}
                            className="pl-9 h-11 focus-visible:ring-primary/20"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Enter your full name"
                          />
                        </div>
                        {field.state.meta.errors && (
                          <p className="text-[10px] font-medium text-destructive mt-1">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Account Email
                    </Label>
                    <div className="relative opacity-80">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/70" />
                      <Input
                        value={initialData?.email}
                        disabled
                        className="pl-9 h-11 bg-muted/50 border-dashed cursor-not-allowed"
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground italic px-1">
                      Email is verified and linked to your login provider.
                    </p>
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
                        size="lg"
                        className="px-8 shadow-md transition-all active:scale-95"
                        disabled={!canSubmit || isSubmitting || !isDirty}
                      >
                        {isSubmitting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          "Save Profile"
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
          <Card className="bg-primary/2 border-dashed border-primary/20 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Security Note
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your name is used for official invoices and customer
                interactions. Changes take effect immediately across all active
                sessions.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Verification</span>
                <span className="text-green-600 font-medium">Verified</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Payout Method</span>
                <span className="font-medium">COD / Bank</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
