import { redirect } from 'next/navigation';
import React from 'react';

const CustomerDashboard = () => {
    redirect("/dashboard/profile");
}
export default CustomerDashboard;