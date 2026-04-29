import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-16">
      {/* Animated 404 */}
      <div className="relative mb-8">
        <div className="text-[10rem] md:text-[14rem] font-extrabold text-orange-100 leading-none select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-7xl animate-bounce" style={{ animationDuration: '2s' }}>
            🍽️
          </div>
        </div>
      </div>

      {/* Message */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
        Oops! This page is missing
      </h1>
      <p className="text-lg text-gray-500 mb-2 max-w-md">
        Looks like this dish isn't on our menu yet.
      </p>
      <p className="text-sm text-gray-400 mb-10 max-w-sm">
        The page you're looking for might have been moved, deleted, or never existed.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transform hover:scale-105 transition-all shadow-lg shadow-orange-200 text-base flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Go to Home
        </Link>
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-4 bg-white text-gray-700 font-bold rounded-2xl border-2 border-gray-200 hover:border-orange-300 hover:text-orange-600 transform hover:scale-105 transition-all shadow-sm text-base flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go Back
        </button>
      </div>

      {/* Quick Links */}
      <div className="mt-12 text-sm text-gray-400">
        <p className="mb-3 font-medium">Or explore:</p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { to: '/meals', label: '🍱 Meals' },
            { to: '/planner', label: '📅 Planner' },
            { to: '/pricing', label: '💎 Pricing' },
            { to: '/about', label: 'ℹ️ About' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="px-4 py-2 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 rounded-full transition-colors font-medium"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
