import LoadingSpinner from '@/components/layout/loadingSpinner';
import React from 'react';

const loading = () => {
    return (
        <div>
            <LoadingSpinner fullScreen={true} text='Loading medicine details' />
        </div>
    );
};

export default loading;