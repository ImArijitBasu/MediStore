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
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Calendar, Store, Tag } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export function MedicineTable({ medicines }: { medicines: any[] }) {
  return (
    <Card className="border-border/50 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-62.5">Medicine & Brand</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Price & Stock</TableHead>
            <TableHead>Added On</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicines?.map((med) => {
            // Extracting data from the first seller listing
            const mainListing = med.sellers?.[0];
            const sellerName = mainListing?.seller?.name || "No Seller";
            const price = mainListing?.price || 0;
            const stock = mainListing?.stockQuantity || 0;

            return (
              <TableRow
                key={med.id}
                className="hover:bg-muted/20 transition-colors"
              >
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">{med.name}</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-tight">
                      Brand: {med.brandName || "N/A"}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-none"
                  >
                    {med.category?.name}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Store className="h-3.5 w-3.5 text-blue-500" />
                    <span className="text-sm font-medium">{sellerName}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-blue-600 text-sm">
                      ৳{price}
                    </span>
                    <span className="text-[10px] text-muted-foreground italic">
                      Stock: {stock} units
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Calendar className="h-3.5 w-3.5" />
                    {format(new Date(med.createdAt), "MMM dd, yyyy")}
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <Link href={`/medicines/${med.id}`}>
                      <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-blue-600" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
