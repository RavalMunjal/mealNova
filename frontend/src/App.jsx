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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Layout>
        <AppRouter />
      </Layout>
      <ToastNotification />
    </CartProvider>
  );
}

export default App;
