
import { SellerServices } from "@/services/seller.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, AlertTriangle, CheckCircle2 } from "lucide-react";
import { UpdateStockDialog } from "@/components/dashboard/seller/UpdateStock";
import { DeleteMedicineDialog } from "@/components/dashboard/seller/DeleteMedicine";

const InventoryPage = async () => {
  const response = await SellerServices.getSellerMedicines();

  const inventoryData = response?.data || [];

  const totalStock = inventoryData.reduce(
    (acc: number, curr: any) => acc + curr.stockQuantity,
    0,
  );
  const lowStockItems = inventoryData.filter(
    (m: any) => m.stockQuantity < 10,
  ).length;

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
        <p className="text-muted-foreground">
          Manage your medicine stock and pricing.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">My Listings</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medicine</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-muted-foreground"
                >
                  No medicines found in your inventory.
                </TableCell>
              </TableRow>
            ) : (
              inventoryData.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-bold">{item.medicine?.name}</div>
                    <div className="text-xs text-muted-foreground uppercase">
                      {item.medicine?.brandName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {item.medicine?.category?.name || "General"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">৳{item.price}</TableCell>
                  <TableCell>
                    <span
                      className={
                        item.stockQuantity < 10
                          ? "text-destructive font-bold"
                          : ""
                      }
                    >
                      {item.stockQuantity}
                    </span>
                  </TableCell>
                  <TableCell>
                    {item.isAvailable ? (
                      <Badge className="bg-green-600">Available</Badge>
                    ) : (
                      <Badge variant="destructive">Out of Stock</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <UpdateStockDialog
                        medicineId={item.medicineId}
                        currentStock={item.stockQuantity}
                        medicineName={item.medicine?.name}
                      />
                      <DeleteMedicineDialog
                        id={item.medicineId}
                        name={item.medicine?.name}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default InventoryPage;
