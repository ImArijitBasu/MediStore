
import { getSession } from "@/actions/user.actions";
import MediStoreFooter from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import React from "react";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const {data} = await getSession();
  const userInfo = data?.user;
  return (
    <div>
      <Navbar isAuthenticated={userInfo} />
      {children}
      <MediStoreFooter/>
    </div>
  );
};

export default CommonLayout;
