// src/router/index.jsx
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Loader from '../components/Loader';

// Lazy load pages
const Home = React.lazy(() => import('../pages/Home'));
const MealsPage = React.lazy(() => import('../pages/Meals'));
const MealDetail = React.lazy(() => import('../pages/MealDetail'));
const CartPage = React.lazy(() => import('../pages/Cart'));
const PlannerPage = React.lazy(() => import('../pages/Planner'));
const Login = React.lazy(() => import('../pages/Login'));
const Profile = React.lazy(() => import('../pages/Profile'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const About = React.lazy(() => import('../pages/About'));
const Pricing = React.lazy(() => import('../pages/Pricing'));
const NotFound = React.lazy(() => import('../pages/NotFound'));
const CheckoutPage = React.lazy(() => import('../pages/CheckoutPage'));
const PaymentPage = React.lazy(() => import('../pages/PaymentPage'));
const OrderConfirmationPage = React.lazy(() => import('../pages/OrderConfirmationPage'));
const TrackingPage = React.lazy(() => import('../pages/TrackingPage'));

const AppRouter = () => {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center bg-[#F9FAFB]">
        <Loader size="lg" />
      </div>
    }>
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
          
          {/* Checkout Flow */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
