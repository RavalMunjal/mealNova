import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { getInitials } from '../utils/helpers';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setDropdownOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
      isActive(path)
        ? 'text-orange-600 bg-orange-50'
        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
    }`;

  return (
    <nav className={`bg-white sticky top-0 z-50 transition-shadow ${scrolled ? 'shadow-md' : 'shadow-sm border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Logo />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className={navLinkClass('/')}>Home</Link>
            <Link to="/meals" className={navLinkClass('/meals')}>Meals</Link>
            <Link to="/planner" className={navLinkClass('/planner')}>Planner</Link>
            <Link to="/about" className={navLinkClass('/about')}>About</Link>
            <Link to="/pricing" className={navLinkClass('/pricing')}>Pricing</Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3 ml-4">
            {/* Cart */}
            <Link
              to="/cart"
              className={`relative p-2 rounded-lg transition-colors ${isActive('/cart') ? 'text-orange-600 bg-orange-50' : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full bg-orange-50 hover:bg-orange-100 transition-colors border border-orange-100"
                >
                  <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-sm">
                    {getInitials(user?.name || 'U')}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 max-w-[100px] truncate">
                    {user?.name?.split(' ')[0] || 'User'}
                  </span>
                  <svg className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="font-bold text-gray-900 text-sm truncate">{user?.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                      <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                        {user?.plan || 'Basic'} Plan
                      </span>
                    </div>
                    <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                      <span>📊</span> Dashboard
                    </Link>
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                      <span>👤</span> My Profile
                    </Link>
                    <Link to="/planner" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                      <span>📅</span> Meal Planner
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <span>🚪</span> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-gray-600 hover:text-orange-600 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/login"
                  className="bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-orange-700 transition-colors shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile cart */}
            <Link to="/cart" className="relative p-2 text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {[
              { to: '/', label: '🏠 Home' },
              { to: '/meals', label: '🍽️ Meals' },
              { to: '/planner', label: '📅 Planner' },
              { to: '/about', label: 'ℹ️ About' },
              { to: '/pricing', label: '💎 Pricing' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  isActive(to)
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-100 px-4 py-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 mb-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center">
                    {getInitials(user?.name || 'U')}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{user?.name}</p>
                    <p className="text-xs text-orange-600 font-semibold">{user?.plan} Plan</p>
                  </div>
                </div>
                <Link to="/dashboard" className="block px-4 py-2.5 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors font-medium">
                  📊 Dashboard
                </Link>
                <Link to="/profile" className="block px-4 py-2.5 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors font-medium">
                  👤 Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium mt-1"
                >
                  🚪 Sign Out
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="flex-1 py-3 text-center border border-orange-200 text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors">
                  Sign In
                </Link>
                <Link to="/login" className="flex-1 py-3 text-center bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
