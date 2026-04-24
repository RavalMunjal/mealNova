import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MOCK_DELIVERIES, MOCK_NOTIFICATIONS } from '../services/mockData';
import { getInitials } from '../utils/helpers';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const displayName = user?.name || 'User';

  return (
    <div className="py-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Good morning, <span className="text-orange-600">{displayName}</span> 👋
          </h1>
          <p className="text-gray-500 mt-1">Here's your meal summary for today.</p>
        </div>
        <Link
          to="/planner"
          className="px-6 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-sm"
        >
          View Planner
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Meals This Week', value: '14', icon: '🍽️', color: 'bg-orange-50 text-orange-600' },
          { label: 'Calories Today', value: '1,800', icon: '⚡', color: 'bg-blue-50 text-blue-600' },
          { label: 'Favourites', value: '12', icon: '❤️', color: 'bg-red-50 text-red-600' },
          { label: 'Active Plan', value: 'Pro', icon: '⭐', color: 'bg-green-50 text-green-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Deliveries */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Today's Deliveries</h2>
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
              {MOCK_DELIVERIES.filter(d => d.date === 'Today').length} deliveries
            </span>
          </div>
          <div className="space-y-4">
            {MOCK_DELIVERIES.filter(d => d.date === 'Today').map((delivery) => (
              <div key={delivery.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {delivery.type === 'Lunch' ? '🍱' : delivery.type === 'Breakfast' ? '🥞' : '🍲'}
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-gray-900 text-sm">{delivery.meal}</p>
                  <p className="text-xs text-gray-500">{delivery.type} • {delivery.time}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${
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
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
              {MOCK_NOTIFICATIONS.filter(n => !n.read).length} new
            </span>
          </div>
          <div className="space-y-3">
            {MOCK_NOTIFICATIONS.map((notif) => (
              <div key={notif.id} className={`flex items-start gap-3 p-4 rounded-xl ${notif.read ? 'bg-gray-50' : 'bg-orange-50 border border-orange-100'}`}>
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notif.read ? 'bg-gray-300' : 'bg-orange-500'}`}></div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{notif.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
