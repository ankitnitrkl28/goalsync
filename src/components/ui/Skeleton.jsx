import React from 'react';

const Skeleton = ({ className = '', type = 'box' }) => {
    const baseClasses = "animate-pulse bg-gray-800 rounded-lg";
    
    if (type === 'text') {
        return <div className={`${baseClasses} h-4 w-full ${className}`}></div>;
    }
    
    if (type === 'circular') {
        return <div className={`animate-pulse bg-gray-800 rounded-full ${className}`}></div>;
    }
    
    return <div className={`${baseClasses} ${className}`}></div>;
};

export default Skeleton;
