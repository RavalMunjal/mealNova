import React from 'react';

const EmptyState = ({ icon, title, message, action }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6 text-4xl">
        {icon || '🍽️'}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title || 'Nothing here yet'}</h3>
      <p className="text-gray-500 max-w-sm mb-6">{message || 'Get started by adding something here.'}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-sm"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
