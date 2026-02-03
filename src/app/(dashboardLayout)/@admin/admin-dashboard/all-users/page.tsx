// app/admin/users/page.tsx
import { AdminServices } from "@/services/admin.service";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Store } from "lucide-react";
import { UserTable } from "@/components/dashboard/admin/UserTable";

export default async function AdminUsersPage() {
  const response = await AdminServices.getAllUsers();
  const allUsers = response?.data || [];

  const customers = allUsers.filter((u: any) => u.role === "CUSTOMER");
  const sellers = allUsers.filter((u: any) => u.role === "SELLER");

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground text-sm">
          Moderate platform participants and manage account permissions.
        </p>
      </div>

      <Tabs defaultValue="customers" className="w-full">
        <TabsList className="grid w-full max-w-100 grid-cols-2">
          <TabsTrigger value="customers" className="flex gap-2">
            <Users className="h-4 w-4" /> Customers ({customers.length})
          </TabsTrigger>
          <TabsTrigger value="sellers" className="flex gap-2">
            <Store className="h-4 w-4" /> Sellers ({sellers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="mt-6">
          <UserTable users={customers} title="Customer Directory" />
        </TabsContent>

        <TabsContent value="sellers" className="mt-6">
          <UserTable users={sellers} title="Seller Directory" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
