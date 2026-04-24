import React from 'react';

const GroceryItem = ({ item, onToggle }) => {
  const { id, name, amount, category, checked } = item;

  return (
    <li
      onClick={() => onToggle(id)}
      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
        checked ? 'opacity-60' : ''
      }`}
    >
      {/* Checkbox */}
      <div
        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          checked ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
        }`}
      >
        {checked && (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      {/* Info */}
      <div className="flex-grow">
        <p className={`font-medium text-gray-900 ${checked ? 'line-through text-gray-400' : ''}`}>
          {name}
        </p>
        <div className="flex gap-2 text-sm text-gray-500 mt-0.5">
          <span>{amount}</span>
          <span>•</span>
          <span className="text-orange-600 font-medium">{category}</span>
        </div>
      </div>
    </li>
  );
};

export default GroceryItem;
