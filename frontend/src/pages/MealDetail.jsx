import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { MOCK_MEALS } from '../services/mockData';

import toast from 'react-hot-toast';

const NutritionBar = ({ label, value, max, color }) => (
  <div>
    <div className="flex justify-between text-xs mb-1">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="font-bold text-gray-700">{value}g</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      />
    </div>
  </div>
);

const MealDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('ingredients');

  const cartItems = useSelector((state) => state.cart.items);

  // Find real meal from mockData
  const meal = MOCK_MEALS.find((m) => m.id === id) || MOCK_MEALS[0];

  // Derived data
  const mealPrice = meal.price || Math.round(meal.calories / 10);
  const isInCart = cartItems.some((i) => i.id === meal.id);

  // Static recipe detail data (enriched display)
  const ingredients = [
    `${meal.name.split(' ')[0]} - main ingredient`,
    'Fresh spices & herbs blend',
    'Cooking oil (2 tbsp)',
    'Salt & pepper to taste',
    'Garnish (coriander / mint)',
    'Water as needed',
  ];

  const steps = [
    `Prepare all ingredients for ${meal.name}. Clean and chop as required.`,
    'Heat oil in a pan on medium flame and add base spices (cumin, mustard seeds).',
    'Add onion and sauté till golden brown. Add ginger-garlic paste.',
    'Add main ingredients and cook for 10-15 minutes, stirring occasionally.',
    'Add salt, spices, and mix well. Adjust consistency with water.',
    `Garnish with fresh coriander and serve hot. ${meal.name} is ready!`,
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      dispatch(addToCart({ ...meal, price: mealPrice }));
    }
    setAdded(true);
    toast.success(`${qty}x ${meal.name} added to cart!`, {
      style: { borderRadius: '10px', background: '#111827', color: '#fff' },
      iconTheme: { primary: '#ea580c', secondary: '#fff' },
    });
    setTimeout(() => setAdded(false), 1500);
  };

  const relatedMeals = MOCK_MEALS.filter(
    (m) => m.category === meal.category && m.id !== meal.id
  ).slice(0, 4);

  return (
    <div className="py-8 max-w-6xl mx-auto">
      {/* Back link */}
      <Link
        to="/meals"
        className="inline-flex items-center text-gray-500 hover:text-orange-600 mb-6 transition-colors font-medium"
      >
        <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Meals
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg h-80 lg:h-auto min-h-72">
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.style.background = 'linear-gradient(135deg, #fed7aa, #fb923c)';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

          {/* Tags on image */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {meal.tags.map((tag) => (
              <span key={tag} className="bg-white/90 backdrop-blur text-gray-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                {tag}
              </span>
            ))}
          </div>

          {/* Rating badge */}
          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 font-extrabold px-3 py-1.5 rounded-full text-sm shadow-md">
            ★ {meal.rating}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {meal.category}
            </span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${meal.isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              <span className={`w-2 h-2 rounded-full ${meal.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></span>
              {meal.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            </span>
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
              {meal.cuisine} Cuisine
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{meal.name}</h1>
          <p className="text-gray-600 mb-5 leading-relaxed">
            A delicious {meal.cuisine} style {meal.category.toLowerCase()} dish crafted with authentic spices and fresh ingredients.
            {meal.tags.includes('High Protein') ? ' Rich in protein, perfect for fitness enthusiasts.' : ''}
            {meal.isVeg ? ' Completely vegetarian and satisfying.' : ' A wholesome non-veg treat.'}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Prep Time', value: `${meal.prepTime} min`, icon: '⏱' },
              { label: 'Calories', value: `${meal.calories}`, icon: '🔥' },
              { label: 'Protein', value: `${meal.protein}g`, icon: '💪' },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100 hover:border-orange-200 transition-colors">
                <p className="text-2xl mb-1">{stat.icon}</p>
                <p className="text-gray-900 font-bold">{stat.value}</p>
                <p className="text-gray-500 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Nutrition bars */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3 border border-gray-100">
            <p className="text-sm font-bold text-gray-700 mb-3">Nutrition Info (per serving)</p>
            <NutritionBar label="Carbohydrates" value={meal.carbs} max={100} color="bg-blue-400" />
            <NutritionBar label="Protein" value={meal.protein} max={50} color="bg-green-500" />
            <NutritionBar label="Fat" value={meal.fat} max={50} color="bg-yellow-400" />
          </div>

          {/* Allergens */}
          {meal.allergens.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-xs text-gray-500 font-medium">⚠️ Contains:</span>
              {meal.allergens.map((a) => (
                <span key={a} className="text-xs bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full font-medium capitalize">
                  {a}
                </span>
              ))}
            </div>
          )}

          {/* Price + Quantity + Add to Cart */}
          <div className="flex flex-col gap-4 mt-auto">
            <div className="flex items-end gap-2">
              <span className="text-gray-500 font-medium pb-1">Price:</span>
              <span className="text-3xl font-extrabold text-orange-600">₹{mealPrice}</span>
              {qty > 1 && <span className="text-sm text-gray-400 font-medium pb-1 ml-2">Total: ₹{mealPrice * qty}</span>}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-100 rounded-xl">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-orange-600 font-bold text-lg transition-colors"
                >
                  −
                </button>
                <span className="w-8 text-center font-bold text-gray-900">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-orange-600 font-bold text-lg transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-base transition-all duration-200 shadow-md ${
                  added
                    ? 'bg-green-500 text-white scale-95'
                    : 'bg-orange-600 text-white hover:bg-orange-700 hover:scale-[1.02]'
                }`}
              >
                {added ? '✓ Added to Cart!' : `Add ${qty > 1 ? `(${qty})` : ''} to Cart`}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Ingredients / Steps */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10">
        <div className="flex border-b border-gray-100">
          {['ingredients', 'steps'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-sm font-bold capitalize transition-colors relative ${
                activeTab === tab ? 'text-orange-600' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab === 'ingredients' ? '🥗 Ingredients' : '👨‍🍳 Instructions'}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600" />
              )}
            </button>
          ))}
        </div>

        <div className="p-6 md:p-8">
          {activeTab === 'ingredients' ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ingredients.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <ol className="space-y-4">
              {steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-gray-600 leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      {/* Related Meals */}
      {relatedMeals.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More {meal.category} Options</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedMeals.map((m) => (
              <Link key={m.id} to={`/meals/${m.id}`} className="group">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-32 overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.style.background = '#fed7aa'; e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-bold text-gray-900 text-sm line-clamp-2">{m.name}</p>
                    <p className="text-xs text-orange-600 font-semibold mt-1">★ {m.rating}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealDetail;
