import { redirect } from 'next/navigation';
import React from 'react';

const page = () => {
    redirect("/admin-dashboard/profile")
};

export default page;