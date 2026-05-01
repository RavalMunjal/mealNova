import React from 'react';

const Skeleton = ({ className, type = 'card' }) => {
  const baseClass = "animate-pulse bg-gray-200 rounded";
  
  if (type === 'card') {
    return (
      <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 ${className}`}>
        <div className={`${baseClass} h-40 w-full mb-4 rounded-xl`}></div>
        <div className={`${baseClass} h-6 w-3/4 mb-2`}></div>
        <div className={`${baseClass} h-4 w-1/2 mb-4`}></div>
        <div className="flex justify-between items-center mt-4">
          <div className={`${baseClass} h-6 w-1/4`}></div>
          <div className={`${baseClass} h-8 w-1/3 rounded-full`}></div>
        </div>
      </div>
    );
  }

  if (type === 'text') {
    return <div className={`${baseClass} h-4 w-full ${className}`}></div>;
  }

  if (type === 'circle') {
    return <div className={`${baseClass} rounded-full ${className}`}></div>;
  }

  return <div className={`${baseClass} ${className}`}></div>;
};

export default Skeleton;
