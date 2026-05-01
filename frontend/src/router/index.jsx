// src/router/index.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import existing pages
import Home from '../pages/Home';
import MealsPage from '../pages/Meals';
import MealDetail from '../pages/MealDetail';
import CartPage from '../pages/Cart';
import PlannerPage from '../pages/Planner';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import About from '../pages/About';
import Pricing from '../pages/Pricing';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';

// Import new pages
import CheckoutPage from '../pages/CheckoutPage';
import PaymentPage from '../pages/PaymentPage';
import OrderConfirmationPage from '../pages/OrderConfirmationPage';
import TrackingPage from '../pages/TrackingPage';

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/pricing" element={<Pricing />} />

      {/* Protected Routes (using PrivateRoute) */}
      <Route element={<PrivateRoute />}>
        {/* Core App Flow */}
        <Route path="/" element={<Home />} />
        <Route path="/meals" element={<MealsPage />} />
        <Route path="/meals/:id" element={<MealDetail />} />
        
        {/* User Specific & Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<Profile />} />
        {/* New Pages can be protected or public. We'll make them protected as they involve checkout */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
