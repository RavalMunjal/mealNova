import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_MEALS, MOCK_TESTIMONIALS, SUBSCRIPTION_PLANS } from '../services/mockData';
import SEO from '../components/SEO';

const Home = () => {
  const featuredMeals = MOCK_MEALS.filter((m) => m.rating >= 4.8).slice(0, 3);

  return (
    <div className="flex flex-col gap-16 pb-12">
      <SEO 
        title="Home" 
        description="Discover amazing Indian recipes, plan your weekly meals, and get groceries sorted in one place."
      />
      {/* Hero Section */}
      <section className="relative bg-orange-50 rounded-3xl overflow-hidden shadow-sm mt-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-200 opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-yellow-200 opacity-50 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 font-bold text-sm px-4 py-2 rounded-full mb-6">
              <span>🍱</span> Smart Tiffin & Meal Planner
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Delicious Meals, <br />
              <span className="text-orange-600">Planned for You</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Discover amazing Indian recipes, plan your weekly meals, and get groceries sorted in one place.
              Healthy eating — <strong>ghar jaisi</strong> — has never been easier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/meals"
                className="px-8 py-4 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transform hover:scale-105 transition-all shadow-lg text-lg"
              >
                Explore Meals
              </Link>
              <Link
                to="/planner"
                className="px-8 py-4 bg-white text-orange-600 font-bold rounded-full hover:bg-orange-50 border-2 border-orange-200 transform hover:scale-105 transition-all shadow-sm text-lg"
              >
                Start Planning
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10 justify-center lg:justify-start">
              {[
                { val: '40+', label: 'Recipes' },
                { val: '4.8★', label: 'Avg Rating' },
                { val: '3', label: 'Plans' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-extrabold text-orange-600">{s.val}</p>
                  <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              {MOCK_MEALS.slice(0, 4).map((meal, i) => (
                <Link key={meal.id} to={`/meals/${meal.id}`}>
                  <div
                    className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${i === 0 ? 'col-span-2 h-48' : 'h-40'}`}
                  >
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.style.background = 'linear-gradient(135deg, #fed7aa, #fb923c)';
                      }}
                    />
                  </div>
                </Link>
              ))}
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
              <span className="text-lg">🥗</span> <span className="font-bold text-gray-700 text-sm">Fresh Daily</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl shadow-lg animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
              <span className="text-lg">⚡</span> <span className="font-bold text-gray-700 text-sm">Quick Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured / Trending Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">🔥 Trending Recipes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our most loved meals this week — handpicked for taste, nutrition, and rave reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredMeals.map((meal) => (
            <Link key={meal.id} to={`/meals/${meal.id}`} className="group">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <div className="h-52 relative overflow-hidden">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.style.background = 'linear-gradient(135deg, #fed7aa, #fb923c)';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 font-extrabold px-2.5 py-1 rounded-full text-sm">
                    ★ {meal.rating}
                  </div>
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">{meal.prepTime} min</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${meal.isVeg ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                      {meal.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight flex-grow pr-2">{meal.name}</h3>
                  </div>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {meal.cuisine} cuisine • {meal.calories} kcal • ₹{meal.price || Math.round(meal.calories/10)}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {meal.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{meal.category}</span>
                    <span className="text-orange-600 font-bold text-sm group-hover:underline">View Recipe →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/meals"
            className="inline-flex items-center gap-2 bg-orange-600 text-white font-bold px-8 py-3.5 rounded-full hover:bg-orange-700 transition-all hover:scale-105 shadow-lg"
          >
            View All Recipes
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-gray-900 text-white py-20 rounded-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">How MealNova Works</h2>
          <p className="text-gray-400 mb-12 max-w-xl mx-auto">
            Three simple steps to get delicious, home-style meals delivered fresh to your door.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: '🔍', step: '1. Discover', desc: 'Browse 40+ authentic Indian recipes filtered by category, cuisine, and nutrition goals.' },
              { icon: '📅', step: '2. Plan', desc: 'Drag-and-drop meals into your weekly planner and auto-generate your grocery list.' },
              { icon: '🍱', step: '3. Enjoy', desc: 'Follow simple step-by-step instructions or subscribe to get tiffin delivered fresh daily.' },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-3xl mb-6 shadow-lg shadow-orange-500/30">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.step}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">❤️ What Our Users Say</h2>
          <p className="text-gray-600">Real stories from real foodies across India.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TESTIMONIALS.slice(0, 3).map((t) => (
            <div key={t.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-100"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=FF6B35&color=fff`;
                  }}
                />
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.city}</p>
                </div>
                <div className="ml-auto text-yellow-500 font-bold text-sm">
                  {'★'.repeat(t.rating)}
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic">"{t.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl py-16 px-8 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Ready to Eat Better Every Day?
        </h2>
        <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
          Join thousands of happy users who plan smarter meals with MealNova.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-8 py-4 bg-white text-orange-600 font-extrabold rounded-full hover:bg-gray-50 transition-all hover:scale-105 shadow-xl text-lg"
          >
            Get Started Free
          </Link>
          <Link
            to="/pricing"
            className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all text-lg"
          >
            View Plans
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
