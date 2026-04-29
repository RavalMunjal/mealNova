import { useSelector, useDispatch } from 'react-redux';
import { setFilters, searchMeals } from '../features/meals/mealsSlice';
import { MOCK_MEALS } from '../services/mockData';

// Custom hook to access and manage meals state
const useMeals = () => {
  const dispatch = useDispatch();
  const { filteredMeals, allMeals, featured, activeFilters } = useSelector((state) => state.meals);

  const handleSearch = (query) => dispatch(searchMeals(query));
  const handleFilter = (filters) => dispatch(setFilters(filters));

  return {
    meals: filteredMeals,
    allMeals,
    featured,
    activeFilters,
    totalCount: MOCK_MEALS.length,
    handleSearch,
    handleFilter,
  };
};

export default useMeals;
