import LoadingSpinner from '@/components/layout/loadingSpinner';
import React from 'react';

const DashboardLoading = () => {
    return (
        <div>
            <LoadingSpinner fullScreen={true} size='large'/>
        </div>
    );
};

export default DashboardLoading;