import React from 'react';

const Card = ({ children, className = '', hover = true, ...props }) => {
  const hoverStyles = hover 
    ? "hover:shadow-xl hover:-translate-y-1 transition-all duration-300" 
    : "";

  return (
    <div 
      className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-5 border-b border-gray-100 dark:border-slate-700 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-700 ${className}`}>
    {children}
  </div>
);

export default Card;
