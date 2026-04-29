import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_TESTIMONIALS } from '../services/mockData';
import StarRating from '../components/StarRating';

const teamMembers = [
  {
    name: 'Arjun Mehta',
    role: 'Founder & CEO',
    bio: 'Ex-IIT Delhi. Passionate about solving India\'s daily food problem through technology.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    initials: 'AM',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Product',
    bio: 'Former product manager at Swiggy. Obsessed with building delightful user experiences.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    initials: 'PS',
  },
  {
    name: 'Kiran Patel',
    role: 'Head Chef & Operations',
    bio: '15 years of culinary expertise across North and South Indian cuisine. Quality is non-negotiable.',
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    initials: 'KP',
  },
];

const About = () => {
  return (
    <div className="py-8 max-w-6xl mx-auto">

      {/* Hero */}
      <section className="text-center mb-20 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-60"></div>
        </div>
        <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-bold px-4 py-2 rounded-full mb-6">
          <span>🍱</span> Our Story
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Healthy Eating, <br />
          <span className="text-orange-600">Made Simple.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          MealNova was born from a simple idea — every student, hostel resident, and working professional
          deserves delicious, home-style Indian meals without the daily hassle of cooking.
          We bring authentic flavors straight to your door.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            to="/meals"
            className="px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all hover:scale-105 shadow-lg shadow-orange-200"
          >
            Explore Meals
          </Link>
          <Link
            to="/pricing"
            className="px-8 py-4 bg-white text-gray-700 font-bold rounded-2xl border-2 border-gray-200 hover:border-orange-300 hover:text-orange-600 transition-all hover:scale-105 shadow-sm"
          >
            View Plans
          </Link>
        </div>
      </section>

      {/* Mission Banner */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-3xl p-10 md:p-14 mb-20 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-72 h-72 bg-white/10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute left-0 bottom-0 w-48 h-48 bg-white/10 rounded-full -ml-10 -mb-10"></div>
        <div className="relative z-10 max-w-3xl">
          <p className="text-orange-200 font-bold uppercase tracking-widest text-sm mb-3">Our Mission</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight">
            To ensure no Indian goes hungry or eats unhealthy because of time or access constraints.
          </h2>
          <p className="text-orange-100 text-lg leading-relaxed">
            We're building a platform where authentic, nutritious meals are accessible, affordable, and
            consistently delicious — whether you're a student in a hostel, a professional in a PG, or a
            family looking for convenience without compromise.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">What We Stand For</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Every decision we make is guided by these core principles.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🌿',
              title: 'Fresh Ingredients',
              desc: 'Every meal is prepared daily with locally sourced, fresh ingredients. No preservatives, no shortcuts — ever.',
              color: 'bg-green-50 border-green-100',
              iconBg: 'bg-green-100',
            },
            {
              icon: '👨‍🍳',
              title: 'Expert Home Chefs',
              desc: 'Our team of trained home-style chefs ensures authentic regional flavors in every tiffin box delivered.',
              color: 'bg-orange-50 border-orange-100',
              iconBg: 'bg-orange-100',
            },
            {
              icon: '📦',
              title: 'On-Time Delivery',
              desc: 'Punctual delivery within scheduled time slots, every day. Because your schedule matters as much as your food.',
              color: 'bg-blue-50 border-blue-100',
              iconBg: 'bg-blue-100',
            },
            {
              icon: '💡',
              title: 'Smart Customization',
              desc: 'Swap meals, skip days, pause subscriptions — full control over what you eat and when.',
              color: 'bg-purple-50 border-purple-100',
              iconBg: 'bg-purple-100',
            },
            {
              icon: '🏷️',
              title: 'Transparent Pricing',
              desc: 'Clear, honest pricing with no hidden fees. Pay only for what you consume, cancel anytime.',
              color: 'bg-yellow-50 border-yellow-100',
              iconBg: 'bg-yellow-100',
            },
            {
              icon: '♻️',
              title: 'Zero Food Waste',
              desc: 'Our real-time demand dashboard helps vendors prepare exact quantities, dramatically reducing food waste.',
              color: 'bg-teal-50 border-teal-100',
              iconBg: 'bg-teal-100',
            },
          ].map((val) => (
            <div key={val.title} className={`rounded-2xl p-7 border ${val.color} hover:shadow-md transition-shadow`}>
              <div className={`w-14 h-14 ${val.iconBg} rounded-2xl flex items-center justify-center text-3xl mb-5`}>
                {val.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{val.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 text-white rounded-3xl p-12 mb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent"></div>
        <div className="relative z-10">
          <p className="text-center text-orange-400 font-bold uppercase tracking-widest text-sm mb-8">MealNova in Numbers</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10,000+', label: 'Happy Customers', icon: '😊' },
              { value: '40+', label: 'Authentic Recipes', icon: '📋' },
              { value: '99%', label: 'On-Time Delivery', icon: '⏱️' },
              { value: '4.8★', label: 'Average Rating', icon: '⭐' },
            ].map((stat) => (
              <div key={stat.label} className="group">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-4xl font-extrabold text-orange-400 mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </p>
                <p className="text-gray-400 font-medium text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Meet the Team</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            A passionate team of food lovers, tech builders, and operations experts working to transform how India eats.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-lg transition-shadow group">
              <div className="relative inline-block mb-5">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-orange-100 group-hover:border-orange-300 transition-colors"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white text-2xl font-extrabold items-center justify-center border-4 border-orange-100 hidden"
                >
                  {member.initials}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-orange-600 font-semibold text-sm mb-3">{member.role}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">❤️ What Our Customers Say</h2>
          <p className="text-gray-500">Real stories from real foodies across India.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
              <StarRating rating={t.rating} size="sm" />
              <p className="text-gray-600 my-5 italic leading-relaxed flex-grow">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-100"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=FF6B35&color=fff&size=48`;
                  }}
                />
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">📍 {t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-50 rounded-3xl p-12 text-center border border-orange-100">
        <div className="text-5xl mb-4">🍱</div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Ready to eat better?</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Join 10,000+ happy users enjoying fresh, authentic Indian meals every day.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all hover:scale-105 shadow-lg shadow-orange-200 text-lg inline-block"
          >
            Get Started Free
          </Link>
          <Link
            to="/pricing"
            className="px-8 py-4 bg-white text-gray-700 font-bold rounded-2xl border-2 border-gray-200 hover:border-orange-300 hover:text-orange-600 transition-all text-lg inline-block"
          >
            See Pricing
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
