import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { swapMeal, savePlan, resetPlan } from '../features/planner/plannerSlice';
import { MOCK_MEALS } from '../services/mockData';
import { Sunrise, Sun, Moon, Flame, Dumbbell } from 'lucide-react';

const DAYS = [
  { key: 'mon', label: 'Monday' },
  { key: 'tue', label: 'Tuesday' },
  { key: 'wed', label: 'Wednesday' },
  { key: 'thu', label: 'Thursday' },
  { key: 'fri', label: 'Friday' },
  { key: 'sat', label: 'Saturday' },
  { key: 'sun', label: 'Sunday' },
];

const MEAL_TIMES = [
  { key: 'breakfast', label: 'Breakfast', icon: <Sunrise className="w-3.5 h-3.5 inline-block -mt-0.5" />, time: '8:00 AM', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' },
  { key: 'lunch', label: 'Lunch', icon: <Sun className="w-3.5 h-3.5 inline-block -mt-0.5" />, time: '1:00 PM', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' },
  { key: 'dinner', label: 'Dinner', icon: <Moon className="w-3.5 h-3.5 inline-block -mt-0.5" />, time: '7:30 PM', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' },
];

const getMealById = (id) => MOCK_MEALS.find((m) => m.id === id);

const MealSlot = ({ mealId, mealTime, dayKey, onSwap, onRemove }) => {
  const meal = getMealById(mealId);
  const mt = MEAL_TIMES.find((m) => m.key === mealTime);

  if (!meal) {
    // Empty slot
    return (
      <div
        onClick={() => onSwap(dayKey, mealTime)}
        className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-orange-300 dark:hover:border-orange-500 hover:bg-orange-50/30 dark:hover:bg-[#2D1A0E]/50 transition-colors cursor-pointer group min-h-[120px]"
      >
        <div className="w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-gray-400 dark:text-slate-400 mb-2 group-hover:bg-orange-100 dark:group-hover:bg-[#2D1A0E] group-hover:text-orange-500 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-slate-400 font-medium text-sm group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
          Add {mt?.label}
        </p>
        <p className="text-gray-400 dark:text-slate-500 text-xs mt-0.5">Tap to select a meal</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 flex gap-4 items-center p-4 group hover:border-orange-200 dark:hover:border-slate-600 hover:bg-orange-50/20 dark:hover:bg-slate-700 transition-colors">
      {/* Image */}
      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentNode.style.background = 'linear-gradient(135deg, #fed7aa, #fb923c)';
          }}
        />
      </div>

      {/* Info */}
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${mt?.color}`}>
            {mt?.icon} {mt?.label}
          </span>
          <span className="text-xs text-gray-400 dark:text-slate-400">{mt?.time}</span>
        </div>
        <h4 className="font-bold text-gray-900 dark:text-slate-100 text-sm line-clamp-1">{meal.name}</h4>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
          {meal.calories} kcal • {meal.cuisine} • {meal.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button
          onClick={() => onSwap(dayKey, mealTime)}
          className="p-1.5 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors text-xs font-medium"
          title="Change meal"
        >
          ↔
        </button>
        <button
          onClick={() => onRemove(dayKey, mealTime)}
          className="p-1.5 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-red-500 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors text-xs font-medium"
          title="Remove meal"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// Modal to pick a meal
const MealPickerModal = ({ isOpen, onClose, onSelect, mealTime }) => {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');

  if (!isOpen) return null;

  const cats = ['All', 'Breakfast', 'Lunch', 'Dinner'];
  const filtered = MOCK_MEALS.filter((m) => {
    const matchCat = cat === 'All' || m.category === cat;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col transition-colors" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-gray-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Pick a {mealTime?.charAt(0).toUpperCase() + mealTime?.slice(1)}
            </h3>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-gray-500 dark:text-slate-400 font-bold">✕</button>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search meals..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-3 transition-colors"
            autoFocus
          />
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  cat === c ? 'bg-orange-600 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-slate-600'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-y-auto flex-grow p-3 space-y-2">
          {filtered.map((meal) => (
            <button
              key={meal.id}
              onClick={() => onSelect(meal.id)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors text-left group border border-transparent hover:border-orange-200 dark:hover:border-slate-600"
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.style.background = '#fed7aa'; }}
                />
              </div>
              <div className="flex-grow min-w-0">
                <p className="font-bold text-gray-900 dark:text-slate-100 text-sm line-clamp-1">{meal.name}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">{meal.calories} kcal • {meal.cuisine} • ★{meal.rating}</p>
              </div>
              <span className="text-orange-600 dark:text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">+</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-gray-400 dark:text-slate-500 py-8">No meals found</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Planner = () => {
  const dispatch = useDispatch();
  const { weekPlan, isDirty } = useSelector((state) => state.planner);
  const [activeDay, setActiveDay] = useState('mon');
  const [modal, setModal] = useState({ open: false, day: null, mealTime: null });
  const [saved, setSaved] = useState(false);

  const openPicker = (day, mealTime) => setModal({ open: true, day, mealTime });
  const closePicker = () => setModal({ open: false, day: null, mealTime: null });

  const handleSelectMeal = (mealId) => {
    dispatch(swapMeal({ day: modal.day, mealTime: modal.mealTime, newMealId: mealId }));
    closePicker();
  };

  const handleRemoveMeal = (day, mealTime) => {
    dispatch(swapMeal({ day, mealTime, newMealId: null }));
  };

  const handleSave = () => {
    dispatch(savePlan());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Reset to default meal plan?')) {
      dispatch(resetPlan());
    }
  };

  // Calculate weekly nutrition totals
  const currentDayPlan = weekPlan[activeDay] || {};
  const plannedMeals = Object.values(currentDayPlan).filter(Boolean).map(getMealById).filter(Boolean);
  const totalCals = plannedMeals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = plannedMeals.reduce((sum, m) => sum + m.protein, 0);

  // Total ingredients estimate
  const allPlannedMeals = Object.values(weekPlan).flatMap((day) =>
    Object.values(day).filter(Boolean).map(getMealById).filter(Boolean)
  );
  const uniqueIngredients = new Set(allPlannedMeals.flatMap((m) => m.allergens.concat(m.tags)));

  return (
    <div className="py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Weekly Meal Planner</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">
            Organize your meals and generate your grocery list effortlessly.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2.5 bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 font-bold rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-sm"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={!isDirty}
            className={`px-5 py-2.5 font-bold rounded-xl transition-all text-sm ${
              saved
                ? 'bg-green-500 text-white'
                : isDirty
                ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-md'
                : 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed'
            }`}
          >
            {saved ? '✓ Saved!' : isDirty ? 'Save Plan' : 'Saved'}
          </button>
        </div>
      </div>

      {/* Day tabs */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden mb-8 transition-colors">
        <div className="flex overflow-x-auto border-b border-gray-100 dark:border-slate-700 hide-scrollbar">
          {DAYS.map(({ key, label }) => {
            const dayMeals = Object.values(weekPlan[key] || {}).filter(Boolean).length;
            return (
              <button
                key={key}
                onClick={() => setActiveDay(key)}
                className={`flex-1 min-w-[110px] py-4 px-2 text-center font-semibold transition-colors relative text-sm ${
                  activeDay === key
                    ? 'text-orange-600 bg-orange-50/50 dark:bg-[#2D1A0E]/50'
                    : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-50 dark:hover:bg-slate-700'
                }`}
              >
                <span className="block">{label.slice(0, 3)}</span>
                <span className="text-xs font-normal mt-0.5 block text-gray-400 dark:text-slate-500">{dayMeals}/3 meals</span>
                {activeDay === key && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600" />
                )}
              </button>
            );
          })}
        </div>

        {/* Planner Content */}
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {DAYS.find((d) => d.key === activeDay)?.label}
            </h2>
            <div className="flex gap-3 text-sm">
              <span className="bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                <Flame className="w-4 h-4" /> {totalCals} kcal
              </span>
              <span className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                <Dumbbell className="w-4 h-4" /> {totalProtein}g protein
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {MEAL_TIMES.map(({ key: mtKey }) => (
              <MealSlot
                key={mtKey}
                mealId={weekPlan[activeDay]?.[mtKey]}
                mealTime={mtKey}
                dayKey={activeDay}
                onSwap={openPicker}
                onRemove={handleRemoveMeal}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Grocery CTA */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-[#2D1A0E] dark:to-yellow-900/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 border border-orange-100 dark:border-orange-900/50 transition-colors">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1">Ready to shop?</h3>
          <p className="text-gray-600 dark:text-slate-400">
            You have <strong>{allPlannedMeals.length}</strong> meals planned this week.
          </p>
        </div>
        <Link
          to="/cart"
          className="w-full md:w-auto px-8 py-3.5 bg-gray-900 dark:bg-slate-700 text-white font-bold rounded-xl hover:bg-black dark:hover:bg-slate-600 transition-colors shadow-lg text-center"
        >
          View Grocery List →
        </Link>
      </div>

      {/* Meal Picker Modal */}
      <MealPickerModal
        isOpen={modal.open}
        onClose={closePicker}
        onSelect={handleSelectMeal}
        mealTime={modal.mealTime}
      />
    </div>
  );
};

export default Planner;
