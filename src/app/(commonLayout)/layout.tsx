
import MediStoreFooter from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <MediStoreFooter/>
    </div>
  );
};

export default CommonLayout;
