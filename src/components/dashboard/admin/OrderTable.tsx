"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Store, Package, MapPin } from "lucide-react";

export function OrderTable({ orders }: { orders: any[] }) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "border-emerald-500 text-emerald-700 bg-emerald-50";
      case "CANCELLED":
        return "border-red-500 text-red-700 bg-red-50";
      case "SHIPPED":
        return "border-blue-500 text-blue-700 bg-blue-50";
      default:
        return "border-amber-500 text-amber-700 bg-amber-50";
    }
  };

  return (
    <Card className="border-border/50 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Medicines</TableHead>
            <TableHead>Bill (COD)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {

            const customerName = order.user?.name || "Guest";
            const customerEmail = order.user?.email || "N/A";

            const sellerInfo = order.items?.[0]?.sellerMedicine?.seller;
            const sellerName = sellerInfo?.name || "Multiple Sellers";

            return (
              <TableRow
                key={order.id}
                className="hover:bg-muted/5 transition-colors"
              >
                <TableCell className="font-mono text-[11px] font-bold text-blue-600">
                  {order.orderNumber}
                </TableCell>


                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">
                      {customerName}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {customerEmail}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Store className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-sm font-medium">{sellerName}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="flex items-center gap-1 text-xs font-semibold hover:text-blue-600 underline underline-offset-4 decoration-slate-300">
                          <Package className="h-3.5 w-3.5" />
                          {order.items?.length || 0} Item(s)
                        </button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="w-64 p-0 shadow-xl border-none"
                      >
                        <div className="bg-slate-900 text-white p-2 text-[10px] font-bold uppercase rounded-t-md">
                          Order Contents
                        </div>
                        <div className="bg-white p-3 space-y-3 rounded-b-md">
                          {order.items?.map((item: any, i: number) => {
                            // Mapping to your specific console log structure
                            const medicineName =
                              item.sellerMedicine?.medicine?.name ||
                              "Unknown Product";
                            const brand =
                              item.sellerMedicine?.medicine?.brandName || "N/A";
                            const price = item.price || 0;

                            return (
                              <div
                                key={i}
                                className="flex flex-col border-b border-slate-100 last:border-0 pb-2 last:pb-0"
                              >
                                <div className="flex justify-between items-start gap-2">
                                  <span className="font-bold text-slate-800 text-xs leading-tight">
                                    {medicineName}
                                  </span>
                                  <Badge
                                    variant="secondary"
                                    className="h-5 text-[10px] px-1"
                                  >
                                    x{item.quantity}
                                  </Badge>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-[10px] text-muted-foreground italic">
                                    {brand}
                                  </span>
                                  <span className="text-[10px] font-mono font-bold text-blue-600">
                                    ৳{price * item.quantity}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">
                      ৳{order.finalAmount}
                    </span>
                    <span className="text-[9px] font-bold text-muted-foreground">
                      COD
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusStyle(order.status)}`}
                  >
                    {order.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex items-start gap-1 max-w-37.5">
                    <MapPin className="h-3 w-3 text-slate-400 mt-0.5" />
                    <span className="text-[10px] text-muted-foreground leading-tight italic truncate">
                      {order.shippingAddress || "No address"}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
