
import { getSession } from "@/actions/user.actions";
import MediStoreFooter from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import React from "react";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const {data} = await getSession();
  const userInfo = data?.user;
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        isAuthenticated={!!userInfo} 
        userInfo={userInfo ? {
          name: userInfo.name,
          email: userInfo.email,
          image: userInfo.image,
          role: userInfo.role,
        } : null}
      />
      <main className="flex-1">{children}</main>
      <MediStoreFooter/>
    </div>
  );
};

export default CommonLayout;
