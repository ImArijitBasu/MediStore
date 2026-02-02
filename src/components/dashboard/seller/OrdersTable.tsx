"use client";

import React, { useTransition } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Package,
  CheckCircle2,
  Truck,
  Clock,
  MapPin,
  Mail,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { updateOrderStatusAction } from "@/actions/seller.action";

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  PROCESSING: "bg-blue-100 text-blue-700 border-blue-200",
  SHIPPED: "bg-indigo-100 text-indigo-700 border-indigo-200",
  DELIVERED: "bg-emerald-100 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-rose-100 text-rose-700 border-rose-200",
};

export default function SellerOrdersDashboard({
  initialOrders,
}: {
  initialOrders: any[];
}) {
  const [isPending, startTransition] = useTransition();

  const activeOrders = initialOrders.filter((o) =>
    ["PENDING", "PROCESSING", "SHIPPED"].includes(o.status),
  );
  const completedOrders = initialOrders.filter((o) => o.status === "DELIVERED");
  const cancelledOrders = initialOrders.filter((o) => o.status === "CANCELLED");

  const handleUpdate = async (id: string, status: string) => {
    startTransition(async () => {
      const res = await updateOrderStatusAction(id, status);
      res.success
        ? toast.success(`Order ${status.toLowerCase()}`)
        : toast.error(res.message);
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">View your total orders</h1>
        <Badge
          variant="outline"
          className="px-3 py-1 text-blue-600 border-blue-200 bg-blue-50"
        >
          {initialOrders.length} Total Orders
        </Badge>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-96 mb-4">
          <TabsTrigger value="active">
            Active ({activeOrders.length})
          </TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <OrderTable
            orders={activeOrders}
            isPending={isPending}
            onUpdate={handleUpdate}
            type="active"
          />
        </TabsContent>

        <TabsContent value="completed">
          <OrderTable orders={completedOrders} type="completed" />
        </TabsContent>

        <TabsContent value="cancelled">
          <OrderTable orders={cancelledOrders} type="cancelled" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function OrderTable({ orders, isPending, onUpdate, type }: any) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="font-semibold">Order Details</TableHead>
            <TableHead className="font-semibold">Customer</TableHead>
            <TableHead className="font-semibold">Shipping Address</TableHead>
            <TableHead className="font-semibold">Items</TableHead>
            <TableHead className="font-semibold">Amount</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            {type === "active" && (
              <TableHead className="text-right">Action</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-32 text-center text-slate-400"
              >
                No {type} orders found.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order: any) => (
              <TableRow
                key={order.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                {/* Order ID & Date */}
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-xs font-bold text-slate-900 uppercase">
                      #{order.id.slice(-8)}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>

                {/* Username & Email */}
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <User className="h-3 w-3 text-slate-400" />{" "}
                      {order.user?.name}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Mail className="h-3 w-3 text-slate-400" />{" "}
                      {order.user?.email}
                    </div>
                  </div>
                </TableCell>

                {/* Shipping Address */}
                <TableCell>
                  <div className="flex items-start gap-1 max-w-45">
                    <MapPin className="h-3 w-3 text-slate-400 mt-1 shrink-0" />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      {order.shippingAddress || "No address provided"}
                    </span>
                  </div>
                </TableCell>

                {/* Items */}
                <TableCell>
                  <div className="max-w-37.5 space-y-1">
                    {order.items?.map((item: any) => (
                      <span
                        key={item.id}
                        className="text-[11px] block text-slate-600 truncate"
                      >
                        • {item.sellerMedicine?.medicine?.name} (x
                        {item.quantity})
                      </span>
                    ))}
                  </div>
                </TableCell>

                {/* Total */}
                <TableCell className="font-bold text-slate-900 text-sm">
                  ৳{order.totalAmount}
                </TableCell>

                {/* Status Badge */}
                <TableCell>
                  <Badge
                    className={`${statusStyles[order.status]} shadow-none font-medium text-[10px] px-2 py-0`}
                  >
                    {order.status}
                  </Badge>
                </TableCell>

                {/* Actions */}
                {type === "active" && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          disabled={isPending}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {order.status === "PENDING" && (
                          <DropdownMenuItem
                            onClick={() => onUpdate(order.id, "PROCESSING")}
                          >
                            <Package className="mr-2 h-4 w-4 text-blue-500" />{" "}
                            Mark Processing
                          </DropdownMenuItem>
                        )}
                        {(order.status === "PENDING" ||
                          order.status === "PROCESSING") && (
                          <DropdownMenuItem
                            onClick={() => onUpdate(order.id, "SHIPPED")}
                          >
                            <Truck className="mr-2 h-4 w-4 text-indigo-500" />{" "}
                            Mark Shipped
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => onUpdate(order.id, "DELIVERED")}
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />{" "}
                          Complete Delivery
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
