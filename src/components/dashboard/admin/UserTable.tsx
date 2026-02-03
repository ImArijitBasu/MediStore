// components/dashboard/admin/UserTable.tsx
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
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toggleUserStatusAction } from "@/actions/admin.action";

export function UserTable({ users, title }: { users: any[]; title: string }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStatusChange = async (userId: string, currentStatus: string) => {
    setLoadingId(userId);
    const result = await toggleUserStatusAction(userId, currentStatus);

    if (result.success) {
      toast.success(
        `User is now ${currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE"}`,
      );
    } else {
      toast.error(result.message || "Failed to update status");
    }
    setLoadingId(null);
  };

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action (Banned)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-10 text-muted-foreground"
              >
                No users found in this category.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {user.email}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "ACTIVE" ? "default" : "destructive"
                    }
                    className="capitalize font-bold text-[10px]"
                  >
                    {user.status.toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell className="flex justify-end items-center gap-2">
                  {loadingId === user.id && (
                    <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                  )}
                  <Switch
                    checked={user.status === "BANNED"}
                    onCheckedChange={() =>
                      handleStatusChange(user.id, user.status)
                    }
                    disabled={loadingId === user.id}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
