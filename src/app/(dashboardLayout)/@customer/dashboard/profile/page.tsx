

import ProfileForm from "@/components/dashboard/seller/SellerProfileForm";
import { userService } from "@/services/user.service";
import { notFound, redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await userService.getSession();

  if (!session.data || session.error) {
    redirect("/login");
  }

  const user = session.data.user;
  return (
       <div className="p-8 max-w-4xl mx-auto space-y-6">
         <div>
           <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
           <p className="text-muted-foreground text-sm">
             Here you can update your personal information
           </p>
         </div>
         <ProfileForm initialData={user} />
       </div>
  );
}
