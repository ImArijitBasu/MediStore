// app/admin/profile/page.tsx
import { userService } from "@/services/user.service";
import { AdminServices } from "@/services/admin.service";
import { redirect } from "next/navigation";
import AdminProfileForm from "@/components/dashboard/admin/AdminProfileForm";
import { AdminStatsCards } from "@/components/dashboard/admin/AdminStatsCards";


export default async function AdminProfilePage() {
  const session = await userService.getSession();

  if (!session.data || session.error) {
    redirect("/login");
  }

  const statsRes = await AdminServices.getAdminStats();
  const user = session.data.user;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Admin Control Center
        </h1>
        <p className="text-muted-foreground">
          Monitor platform vitals and manage your administrative identity.
        </p>
      </div>

      <AdminStatsCards stats={statsRes.data} />
      <AdminProfileForm initialData={user} />
    </div>
  );
}
