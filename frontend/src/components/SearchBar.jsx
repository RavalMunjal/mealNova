import React from 'react';
import { useDispatch } from 'react-redux';
import { searchMeals } from '../features/meals/mealsSlice';

const SearchBar = ({ placeholder = 'Search recipes...' }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(searchMeals(e.target.value));
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all"
      />
      <svg
        className="w-5 h-5 text-gray-400 absolute left-3 top-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
};

export default SearchBar;
