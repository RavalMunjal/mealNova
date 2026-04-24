import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../features/meals/mealsSlice';
import { MEAL_CATEGORIES } from '../utils/constants';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state) => state.meals.activeFilters.category);

  const handleSelect = (category) => {
    dispatch(setFilters({ category }));
  };

  return (
    <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar scroll-smooth">
      {MEAL_CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => handleSelect(category)}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            activeCategory === category
              ? 'bg-orange-600 text-white shadow-md scale-105'
              : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
