import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MOCK_DELIVERIES, MOCK_NOTIFICATIONS, MOCK_MEALS } from '../services/mockData';
import { Utensils, Flame, ShoppingCart, Star, Package, Bell, Coffee, UtensilsCrossed, Soup, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);
  const { weekPlan } = useSelector((state) => state.planner);
  const displayName = user?.name || 'User';

  // Calculate weekly meals planned
  const plannedMealsCount = Object.values(weekPlan).reduce((total, day) => {
    return total + Object.values(day).filter(Boolean).length;
  }, 0);

  // Today's total calories from cart
  const cartCalories = cartItems.reduce((sum, item) => sum + item.calories * item.quantity, 0);

  // Featured meals for quick add
  const featuredMeals = MOCK_MEALS.filter((m) => m.rating >= 4.8).slice(0, 3);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="py-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {greeting}, <span className="text-orange-600">{displayName.split(' ')[0]}</span> 👋
          </h1>
          <p className="text-gray-500 mt-1">Here's your meal summary for today.</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/meals"
            className="px-5 py-2.5 bg-white text-orange-600 font-bold rounded-xl border border-orange-200 hover:bg-orange-50 transition-colors shadow-sm text-sm"
          >
            Browse Meals
          </Link>
          <Link
            to="/planner"
            className="px-5 py-2.5 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-sm text-sm"
          >
            View Planner
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Meals Planned', value: plannedMealsCount, icon: <Utensils className="w-6 h-6" />, color: 'bg-orange-50 text-orange-600', sub: 'this week' },
          { label: 'Cart Calories', value: cartCalories > 0 ? cartCalories : '–', icon: <Flame className="w-6 h-6" />, color: 'bg-blue-50 text-blue-600', sub: 'from cart items' },
          { label: 'Cart Items', value: cartItems.length, icon: <ShoppingCart className="w-6 h-6" />, color: 'bg-purple-50 text-purple-600', sub: 'selected meals' },
          { label: 'Active Plan', value: user?.plan || 'Basic', icon: <Star className="w-6 h-6 fill-current" />, color: 'bg-green-50 text-green-600', sub: 'subscription' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-2xl mb-3`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
            <p className="text-sm font-semibold text-gray-700 mt-0.5">{stat.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Today's Deliveries */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-6 h-6 text-orange-600" /> Today's Deliveries
            </h2>
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
              {MOCK_DELIVERIES.filter((d) => d.date === 'Today').length} deliveries
            </span>
          </div>
          <div className="space-y-3">
            {MOCK_DELIVERIES.map((delivery) => (
              <div key={delivery.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-sm ${delivery.date === 'Today' ? 'bg-gray-50 border-gray-100' : 'bg-blue-50/30 border-blue-100'}`}>
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  {delivery.type === 'Lunch' ? <UtensilsCrossed className="w-6 h-6" /> : delivery.type === 'Breakfast' ? <Coffee className="w-6 h-6" /> : <Soup className="w-6 h-6" />}
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-semibold text-gray-900 text-sm line-clamp-1">{delivery.meal}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {delivery.date} • {delivery.type} • {delivery.time}
                  </p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                  delivery.status === 'Out for Delivery'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {delivery.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Bell className="w-6 h-6 text-orange-600" /> Notifications
            </h2>
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
              {MOCK_NOTIFICATIONS.filter((n) => !n.read).length} new
            </span>
          </div>
          <div className="space-y-3">
            {MOCK_NOTIFICATIONS.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                  notif.read ? 'bg-gray-50' : 'bg-orange-50 border border-orange-100'
                }`}
              >
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notif.read ? 'bg-gray-300' : 'bg-orange-500'}`}></div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{notif.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Meals */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-orange-600" /> Recommended For You
          </h2>
          <Link to="/meals" className="text-orange-600 text-sm font-bold hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {featuredMeals.map((meal) => (
            <Link key={meal.id} to={`/meals/${meal.id}`} className="group">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all">
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.style.background = '#fed7aa'; }}
                  />
                </div>
                <div className="min-w-0 flex-grow">
                  <p className="font-bold text-gray-900 text-sm line-clamp-1">{meal.name}</p>
                  <p className="text-xs text-gray-500">{meal.calories} kcal</p>
                  <p className="text-xs text-yellow-600 font-bold">★ {meal.rating}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
