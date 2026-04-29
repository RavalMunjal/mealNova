import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, searchMeals } from '../features/meals/mealsSlice';
import { addToCart } from '../features/cart/cartSlice';
import { MOCK_MEALS } from '../services/mockData';

import toast from 'react-hot-toast';

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Salad', 'Dessert', 'Extra'];

const VegBadge = ({ isVeg }) => (
  <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
    <span className={`w-2 h-2 rounded-full ${isVeg ? 'bg-green-500' : 'bg-red-500'}`}></span>
    {isVeg ? 'Veg' : 'Non-Veg'}
  </span>
);

const MealCard = ({ meal, onAddToCart }) => {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    onAddToCart(meal);
    setAdded(true);
    toast.success(`${meal.name} added to cart!`, {
      style: {
        borderRadius: '10px',
        background: '#111827',
        color: '#fff',
      },
      iconTheme: {
        primary: '#ea580c',
        secondary: '#fff',
      },
    });
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link to={`/meals/${meal.id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
        {/* Image */}
        <div className="h-48 relative overflow-hidden flex-shrink-0">
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.classList.add('bg-orange-50'); }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

          {/* Favorite btn */}
          <button
            onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full transition-all hover:scale-110"
          >
            <svg className={`w-5 h-5 transition-colors ${liked ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Prep time */}
          <div className="absolute bottom-3 left-3">
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              ⏱ {meal.prepTime} min
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-gray-900 leading-tight line-clamp-1 flex-grow pr-2">{meal.name}</h3>
            <div className="flex items-center bg-yellow-50 px-2 py-0.5 rounded text-yellow-700 text-xs font-bold whitespace-nowrap">
              ★ {meal.rating}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            <VegBadge isVeg={meal.isVeg} />
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{meal.cuisine}</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span>🔥 {meal.calories} kcal</span>
            <span>💪 {meal.protein}g protein</span>
          </div>

          <div className="mt-auto flex justify-between items-center">
            <div>
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold block">Price</span>
              <span className="font-bold text-orange-600 text-lg">₹{meal.price}</span>
            </div>
            <button
              onClick={handleAdd}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 shadow-sm ${
                added
                  ? 'bg-green-500 text-white scale-95'
                  : 'bg-gray-900 text-white hover:bg-orange-600 hover:scale-105'
              }`}
            >
              {added ? '✓ Added' : '+ Add'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ITEMS_PER_PAGE = 12;

const Meals = () => {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [vegFilter, setVegFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const { cartItems } = useSelector((state) => ({
    cartItems: state.cart.items,
  }));

  const handleAddToCart = (meal) => {
    dispatch(addToCart({ ...meal, price: Math.round(meal.calories / 10) }));
  };

  const filteredMeals = useMemo(() => {
    let result = [...MOCK_MEALS];

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter((m) => m.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.cuisine.toLowerCase().includes(q) ||
          m.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Veg filter
    if (vegFilter === 'veg') result = result.filter((m) => m.isVeg);
    if (vegFilter === 'nonveg') result = result.filter((m) => !m.isVeg);

    // Sort
    if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    if (sortBy === 'calories_asc') result = [...result].sort((a, b) => a.calories - b.calories);
    if (sortBy === 'calories_desc') result = [...result].sort((a, b) => b.calories - a.calories);
    if (sortBy === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [activeCategory, searchQuery, sortBy, vegFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredMeals.length / ITEMS_PER_PAGE);
  const paginatedMeals = filteredMeals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Explore Meals</h1>
          <p className="text-gray-500 mt-1">
            {filteredMeals.length} dishes found
            {activeCategory !== 'All' && ` in ${activeCategory}`}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-grow md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search meals..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white shadow-sm"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Cart badge */}
          {cartCount > 0 && (
            <Link to="/cart" className="relative p-2.5 bg-orange-600 text-white rounded-full shadow-md hover:bg-orange-700 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Category pills */}
        <div className="flex overflow-x-auto pb-1 gap-2 hide-scrollbar flex-grow">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-orange-600 text-white shadow-md scale-105'
                  : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200 hover:border-orange-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right-side filters */}
        <div className="flex gap-2 flex-shrink-0">
          {/* Veg toggle */}
          <select
            value={vegFilter}
            onChange={(e) => { setVegFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="veg">🟢 Veg Only</option>
            <option value="nonveg">🔴 Non-Veg</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            <option value="default">Sort By</option>
            <option value="rating">⭐ Top Rated</option>
            <option value="name">🔤 A–Z</option>
            <option value="calories_asc">🔽 Low Calories</option>
            <option value="calories_desc">🔼 High Calories</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {paginatedMeals.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No meals found</h3>
          <p className="text-gray-500">Try changing your filters or search term.</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); setVegFilter('all'); }}
            className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedMeals.map((meal) => (
            <MealCard key={meal.id} meal={meal} onAddToCart={handleAddToCart} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-xl font-bold transition-all ${
                  currentPage === page
                    ? 'bg-orange-600 text-white shadow-md scale-110'
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              →
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Meals;
