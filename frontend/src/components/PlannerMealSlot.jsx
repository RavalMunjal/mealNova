import React from 'react';

const PlannerMealSlot = ({ label, meal, onAdd, onRemove }) => {
  return (
    <div className="flex-1 min-w-[200px]">
      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</div>

      {meal ? (
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm group relative">
          <p className="font-semibold text-gray-900 text-sm leading-tight">{meal.name}</p>
          <p className="text-xs text-gray-500 mt-1">{meal.time} min • {meal.calories} cal</p>
          <button
            onClick={() => onRemove(label)}
            className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          onClick={() => onAdd(label)}
          className="w-full h-20 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50/50 transition-all"
        >
          <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-xs font-medium">Add {label}</span>
        </button>
      )}
    </div>
  );
};

export default PlannerMealSlot;
