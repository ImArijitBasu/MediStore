
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {Roles} from "../../constants/roles"
import { userService } from "@/services/user.service";


export default async function DashboardLayout({
  admin,
  seller,
 customer
}: {
  admin: React.ReactNode;
  seller: React.ReactNode;
  customer: React.ReactNode;
}) {

  const { data } = await userService.getSession();
  const userInfo = data?.user;
  console.log("user info from dashboard layout", userInfo);
  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {userInfo.role === Roles.admin ? admin : userInfo.role === Roles.seller ? seller : userInfo.role === Roles.customer ? customer : null}
      </SidebarInset>
    </SidebarProvider>
  );
}
