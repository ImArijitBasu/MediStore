// components/orders/OrderTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, XCircle } from "lucide-react";
import Link from "next/link";
import { ReviewDialog } from "./ReviewDialog";
import { CancelOrderConfirm } from "./CancelOrderAlert";

export function OrderTable({ orders, statusStyles, showReviewAction }: any) {
  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-[120px]">Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-32 text-center text-muted-foreground"
              >
                No orders found in this category.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order: any) => (
              <TableRow
                key={order.id}
                className="group hover:bg-slate-50/50 transition-colors"
              >
                <TableCell className="font-mono text-xs font-bold uppercase text-slate-600">
                  #{order.id.slice(-7)}
                </TableCell>
                <TableCell className="text-sm text-slate-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div
                    className="max-w-[200px] truncate text-xs text-slate-500"
                    title={order.items
                      ?.map((item: any) => item.sellerMedicine?.medicine?.name)
                      .join(", ")}
                  >
                    {order.items
                      ?.map((item: any) => item.sellerMedicine?.medicine?.name)
                      .join(", ")}
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  ৳{order.totalAmount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${statusStyles[order.status]} shadow-none border font-medium px-2 py-0.5`}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    {/* CANCEL ACTION: Only for Pending or Processing */}
                    {(order.status === "PENDING" ||
                      order.status === "PROCESSING") && (
                      <CancelOrderConfirm orderId={order.id} />
                    )}

                    {/* REVIEW ACTION: Only for Delivered (via showReviewAction prop) */}
                    {showReviewAction && <ReviewDialog order={order} />}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      asChild
                      title="View Details"
                    >
                      <Link href={`/dashboard/orders/${order.id}`}>
                        <Eye className="h-4 w-4 text-slate-500" />
                        <span className="sr-only">Details</span>
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
