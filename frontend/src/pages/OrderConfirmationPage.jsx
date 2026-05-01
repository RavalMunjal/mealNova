// src/pages/OrderConfirmationPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const { orderId, selectedPlan, deliverySlot, cartItems, clearCart } = useCartStore();
  
  const cartList = Object.values(cartItems);

  const handleContinueShopping = () => {
    clearCart();
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4">
      <style dangerouslySetInnerHTML={{__html: `
        .checkmark-circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 2;
          stroke-miterlimit: 10;
          stroke: #4BB543;
          fill: none;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .checkmark-check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }
        @keyframes stroke {
          100% { stroke-dashoffset: 0; }
        }
      `}} />
      
      {/* Animated Checkmark */}
      <div className="w-24 h-24 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
          <path className="checkmark-check" fill="none" stroke="#4BB543" strokeWidth="5" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>

      <h1 className="text-4xl font-bold font-playfair mb-2 text-center text-gray-800">Order Placed Successfully!</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">Your tiffin is being prepared with love 🍱</p>

      {/* Order Details Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full max-w-md mb-8">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <span className="text-gray-500">Order ID</span>
          <span className="font-mono font-bold text-[#E8521A]">{orderId || 'MN-123456'}</span>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Delivery Slot</span>
            <span className="font-medium text-right">{deliverySlot || 'Morning 8–10 AM'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Plan</span>
            <span className="font-medium">{selectedPlan?.label || 'One-time Order'}</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Items:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {cartList.map(item => (
              <li key={item.meal.id} className="flex justify-between">
                <span>{item.quantity}x {item.meal.name}</span>
                <span>₹{item.meal.price * item.quantity}</span>
              </li>
            ))}
            {cartList.length === 0 && <li>1x Dummy Meal (₹0)</li>}
          </ul>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
          onClick={() => navigate('/tracking')}
          className="flex-1 py-3 px-6 bg-[#E8521A] text-white rounded-lg font-semibold hover:bg-[#D44715] transition-colors text-center"
        >
          Track My Order &rarr;
        </button>
        <button
          onClick={handleContinueShopping}
          className="flex-1 py-3 px-6 bg-white text-[#E8521A] border border-[#E8521A] rounded-lg font-semibold hover:bg-[#E8521A]/5 transition-colors text-center"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
