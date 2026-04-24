import React from 'react';

// Variant color mapping
const variants = {
  orange: 'bg-orange-100 text-orange-700',
  green:  'bg-green-100 text-green-700',
  blue:   'bg-blue-100 text-blue-700',
  red:    'bg-red-100 text-red-700',
  gray:   'bg-gray-100 text-gray-700',
};

const Badge = ({ label, variant = 'orange', className = '' }) => {
  return (
    <span
      className={`inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${variants[variant]} ${className}`}
    >
      {label}
    </span>
  );
};

export default Badge;
