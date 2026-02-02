"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShoppingBag,
  Truck,
  CheckCircle2,
  XCircle,
  History,
  Package,
} from "lucide-react";
import { OrderTable } from "./OrderTable";

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  PROCESSING: "bg-blue-50 text-blue-700 border-blue-200",
  SHIPPED: "bg-indigo-50 text-indigo-700 border-indigo-200",
  DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function CustomerOrdersDashboard({
  orders = [],
}: {
  orders: any[];
}) {
  const activeOrders = orders.filter((o) =>
    ["PENDING", "PROCESSING", "SHIPPED"].includes(o.status),
  );
  const completedOrders = orders.filter((o) => o.status === "DELIVERED");
  const cancelledOrders = orders.filter((o) => o.status === "CANCELLED");

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Order History
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your prescriptions, track shipping, and review your
            purchases.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-slate-100/50 p-1.5 rounded-lg border">
          <div className="px-3 py-1.5 bg-white rounded-md shadow-sm border text-sm font-medium flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-primary" />
            Total Orders: {orders.length}
          </div>
        </div>
      </div>

      {/* Quick Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-white border-l-4 border-l-blue-500">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600/80 uppercase tracking-wider">
                In Progress
              </p>
              <p className="text-2xl font-bold text-slate-800">
                {activeOrders.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-emerald-50 to-white border-l-4 border-l-emerald-500">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-600/80 uppercase tracking-wider">
                Completed
              </p>
              <p className="text-2xl font-bold text-slate-800">
                {completedOrders.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-slate-50 to-white border-l-4 border-l-slate-400">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-slate-200 rounded-xl text-slate-600">
              <History className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600/80 uppercase tracking-wider">
                Cancelled
              </p>
              <p className="text-2xl font-bold text-slate-800">
                {cancelledOrders.length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-slate-100 p-1">
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6"
            >
              Cancelled
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="active"
          className="mt-0 ring-offset-background focus-visible:outline-none"
        >
          <OrderTable orders={activeOrders} statusStyles={statusStyles} />
        </TabsContent>

        <TabsContent value="completed" className="mt-0 outline-none">
          <OrderTable
            orders={completedOrders}
            statusStyles={statusStyles}
            showReviewAction
          />
        </TabsContent>

        <TabsContent value="cancelled" className="mt-0 outline-none">
          <OrderTable orders={cancelledOrders} statusStyles={statusStyles} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
