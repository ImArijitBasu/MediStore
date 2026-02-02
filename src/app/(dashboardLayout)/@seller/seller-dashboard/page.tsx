import { redirect } from "next/navigation";
import React from "react";

const SellerDashboard = () => {
  redirect("/seller-dashboard/profile");
};

export default SellerDashboard;
