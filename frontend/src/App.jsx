// src/App.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CartProvider } from './store/cartStore';
import AppRouter from './router/index';
import Layout from './components/Layout';
import './App.css';

const ToastNotification = () => {
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    const handleAdd = (e) => {
      setToast({ show: true, message: `Added ${e.detail.mealName} to cart!` });
      setTimeout(() => {
        setToast({ show: false, message: '' });
      }, 2000);
    };

    window.addEventListener('itemAddedToCart', handleAdd);
    return () => window.removeEventListener('itemAddedToCart', handleAdd);
  }, []);

  if (!toast.show) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-[#E8521A] text-white px-6 py-3 rounded-lg shadow-xl z-50 font-medium tracking-wide flex items-center gap-2 animate-[bounce_0.5s_ease-in-out]">
      <span>✅</span> {toast.message}
    </div>
  );
};

import ReactGA from 'react-ga4';

// Initialize GA with a dummy measurement ID for the project (replace with real one in production)
const MEASUREMENT_ID = import.meta.env.VITE_GA_ID || "G-XXXXXXXXXX";
ReactGA.initialize(MEASUREMENT_ID);

const ScrollAndTrack = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Track pageview
    ReactGA.send({ hitType: "pageview", page: pathname, title: document.title });
  }, [pathname]);
  
  return null;
};

import { useSelector } from 'react-redux';
import socketService from './services/socketService';

function App() {
  const { theme } = useSelector((state) => state.ui);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (isAuthenticated && user?.token) {
      socketService.connect(user.token);
    } else {
      socketService.disconnect();
    }
    
    return () => {
      socketService.disconnect();
    };
  }, [isAuthenticated, user]);

  return (
    <CartProvider>
      <ScrollAndTrack />
      <Layout>
        <AppRouter />
      </Layout>
      <ToastNotification />
    </CartProvider>
  );
}

export default App;
