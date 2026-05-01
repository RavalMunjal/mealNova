import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../features/cart/cartSlice';
import { useCartStore } from '../store/cartStore';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);
  const { setCartItems } = useCartStore();

  const handleCheckout = () => {
    const syncedCart = {};
    items.forEach(item => {
      syncedCart[item.id] = {
        meal: { ...item, cal: item.calories || 0 },
        quantity: item.quantity
      };
    });
    setCartItems(syncedCart);
    navigate('/checkout');
  };

  const handleIncrease = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrease = (item) => {
    dispatch(removeFromCart(item.id));
  };

  const handleClear = () => {
    if (window.confirm('Clear entire cart?')) {
      dispatch(clearCart());
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Cart</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-8">Browse meals and add them to your cart to get started.</p>
          <Link
            to="/meals"
            className="inline-block px-8 py-3.5 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-md"
          >
            Browse Meals
          </Link>
        </div>
      </div>
    );
  }

  const totalCalories = items.reduce((sum, item) => sum + (item.calories * item.quantity), 0);
  const totalProtein = items.reduce((sum, item) => sum + (item.protein * item.quantity), 0);

  return (
    <div className="py-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Cart</h1>
          <p className="text-gray-500 mt-1">{items.length} item{items.length !== 1 ? 's' : ''} selected</p>
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors font-medium text-sm border border-red-100"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.style.background = 'linear-gradient(135deg, #fed7aa, #fb923c)';
                  }}
                />
              </div>

              {/* Info */}
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900 line-clamp-1 pr-2">{item.name}</h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${item.isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.isVeg ? '🟢' : '🔴'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{item.cuisine} • {item.calories} kcal • {item.protein}g protein</p>
                <div className="flex items-center justify-between mt-3">
                  {/* Quantity */}
                  <div className="flex items-center bg-gray-100 rounded-xl">
                    <button
                      onClick={() => handleDecrease(item)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-orange-600 font-bold text-lg transition-colors rounded-l-xl"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-bold text-gray-900 text-sm">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-orange-600 font-bold text-lg transition-colors rounded-r-xl"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          {/* Nutrition Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Nutrition Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total Calories</span>
                <span className="font-bold text-orange-600">🔥 {totalCalories} kcal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total Protein</span>
                <span className="font-bold text-green-600">💪 {totalProtein}g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total Items</span>
                <span className="font-bold text-gray-900">{items.reduce((s, i) => s + i.quantity, 0)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-600">
                  <span className="line-clamp-1 flex-grow pr-2">{item.name} × {item.quantity}</span>
                  <span className="font-medium whitespace-nowrap">
                    {item.calories * item.quantity} kcal
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 mb-5">
              <div className="flex justify-between font-bold text-gray-900">
                <span>Total Meals</span>
                <span className="text-orange-600">{items.reduce((s, i) => s + i.quantity, 0)} servings</span>
              </div>
            </div>

            <button onClick={handleCheckout} className="w-full py-3.5 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-md hover:scale-[1.02] transform">
              Proceed to Checkout
            </button>

            <div className="mt-4 text-center">
              <Link to="/meals" className="text-orange-600 text-sm hover:underline font-medium">
                ← Continue Browsing
              </Link>
            </div>
          </div>

          {/* Planner suggestion */}
          <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
            <p className="text-sm font-bold text-orange-800 mb-1">📅 Plan your week!</p>
            <p className="text-xs text-orange-600">Add these meals to your weekly planner for easy tracking.</p>
            <Link to="/planner" className="mt-2 inline-block text-xs text-orange-700 font-bold hover:underline">
              Go to Planner →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
