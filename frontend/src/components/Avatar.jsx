import React from 'react';
import { getInitials } from '../utils/helpers';

const Avatar = ({ name, size = 'md', imageUrl, className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-2xl',
    xl: 'w-24 h-24 text-3xl',
  };

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white shadow-sm ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-orange-600 text-white font-extrabold flex items-center justify-center shadow-sm border-2 border-white ${className}`}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
