import React from 'react';
import { SORT_OPTIONS } from '../utils/constants';

const SortDropdown = ({ value, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl bg-white text-gray-700 text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 cursor-pointer"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <svg
        className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
};

export default SortDropdown;
