// src/pages/TrackingPage.jsx
import React, { useState, useEffect } from 'react';
import { useCartStore } from '../store/cartStore';

const TrackingPage = () => {
  const { orderId, cartItems, deliverySlot } = useCartStore();
  const [delivered, setDelivered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [itemsOpen, setItemsOpen] = useState(true);

  const cartList = Object.values(cartItems);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelivered(true);
      setShowConfetti(true);
      
      // Stop confetti after 5 seconds
      setTimeout(() => setShowConfetti(false), 5000);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Confetti particles generator
  const renderConfetti = () => {
    if (!showConfetti) return null;
    const colors = ['#E8521A', '#4BB543', '#FFD700', '#1E90FF', '#FF69B4'];
    return (
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-5%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 12 + 6}px`,
              backgroundColor: colors[Math.floor(Math.random() * colors.length)],
              animationDuration: `${Math.random() * 2 + 2}s`,
              animationDelay: `${Math.random() * 0.5}s`
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 relative">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes delivery-move {
          0% { transform: translate(40px, 40px); }
          25% { transform: translate(150px, 40px); }
          50% { transform: translate(150px, 180px); }
          75% { transform: translate(300px, 180px); }
          100% { transform: translate(300px, 180px); } /* Stay at destination */
        }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
        .path-line {
          stroke-dasharray: 10;
          stroke-dashoffset: 1000;
          animation: dash 20s linear infinite;
        }
      `}} />

      {renderConfetti()}

      {/* TOP SECTION */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {orderId || 'MN-123456'}
          </span>
          <h1 className="text-2xl font-bold mt-2 dark:text-white">
            {delivered ? 'Order Delivered' : 'Out for Delivery'}
          </h1>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-slate-400">Estimated delivery</p>
          <p className="font-semibold text-[#E8521A]">{deliverySlot || '12:30 PM'}</p>
        </div>
      </div>

      {delivered && (
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-400 px-4 py-3 rounded-lg mb-6 flex items-center shadow-sm">
          <span className="text-xl mr-2">🎉</span>
          <span className="font-medium">Your tiffin has been delivered! Enjoy your meal.</span>
        </div>
      )}

      {/* MIDDLE SECTION - Fake Live Map */}
      <div className="bg-gray-100 dark:bg-slate-800 rounded-2xl h-[280px] w-full mb-8 relative overflow-hidden shadow-inner border border-gray-200 dark:border-slate-700 transition-colors">
        {/* Simple map background using SVG */}
        <svg className="absolute inset-0 w-full h-full text-gray-200 dark:text-slate-700" xmlns="http://www.w3.org/2000/svg">
          {/* Streets Grid */}
          <path d="M0 60 H800 M0 140 H800 M0 220 H800 M100 0 V300 M260 0 V300 M420 0 V300 M580 0 V300" stroke="currentColor" strokeWidth="15" fill="none" />
          
          {/* Route dashed line */}
          <path d="M 50 50 L 160 50 L 160 190 L 310 190" stroke="#E8521A" strokeWidth="4" strokeDasharray="8 8" fill="none" />
        </svg>

        {/* Labels */}
        <span className="absolute top-2 left-[180px] text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase rotate-90">CG Road</span>
        <span className="absolute top-[80px] left-[20px] text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase">Maninagar</span>

        {/* Kitchen Marker */}
        <div className="absolute top-[40px] left-[40px] w-8 h-8 bg-white border-2 border-[#E8521A] rounded-full flex items-center justify-center shadow-md transform -translate-x-1/2 -translate-y-1/2 z-10">
          <span className="text-sm">🍱</span>
          <div className="absolute top-10 whitespace-nowrap text-xs font-bold bg-white dark:bg-slate-800 dark:text-slate-200 px-2 py-0.5 rounded shadow-sm">Your Kitchen</div>
        </div>

        {/* Home Marker */}
        <div className="absolute top-[180px] left-[300px] w-8 h-8 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center shadow-md transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute top-10 whitespace-nowrap text-xs font-bold bg-white dark:bg-slate-800 dark:text-slate-200 px-2 py-0.5 rounded shadow-sm">Your Home</div>
        </div>

        {/* Delivery Boy */}
        {!delivered && (
          <div 
            className="absolute top-0 left-0 w-8 h-8 bg-[#E8521A] rounded-full flex items-center justify-center shadow-lg z-20"
            style={{ animation: 'delivery-move 10s linear forwards' }}
          >
            <span className="text-sm">🛵</span>
          </div>
        )}
      </div>

      {/* LOWER SECTION - Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 dark:bg-slate-700 -z-10 -translate-y-1/2 rounded-full"></div>
          <div className="absolute left-0 top-1/2 h-1 bg-[#E8521A] -z-10 -translate-y-1/2 rounded-full transition-all duration-1000" style={{ width: delivered ? '100%' : '66%' }}></div>
          
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-sm mb-2 text-sm font-bold">✓</div>
            <span className="text-[10px] font-semibold text-gray-700 dark:text-slate-300 text-center w-16">Confirmed</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-sm mb-2 text-sm font-bold">✓</div>
            <span className="text-[10px] font-semibold text-gray-700 dark:text-slate-300 text-center w-16">Preparing</span>
          </div>
          <div className="flex flex-col items-center">
            {delivered ? (
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-sm mb-2 text-sm font-bold">✓</div>
            ) : (
              <div className="w-8 h-8 bg-[#E8521A] border-4 border-orange-100 dark:border-orange-900 rounded-full shadow-sm mb-2 relative flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>
            )}
            <span className={`text-[10px] font-semibold text-center w-16 ${delivered ? 'text-gray-700 dark:text-slate-300' : 'text-[#E8521A]'}`}>Out for Delivery</span>
          </div>
          <div className="flex flex-col items-center">
            {delivered ? (
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-sm mb-2 text-sm font-bold">✓</div>
            ) : (
              <div className="w-8 h-8 bg-gray-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-gray-500 dark:text-slate-400 shadow-sm mb-2 text-sm">⏱</div>
            )}
            <span className="text-[10px] font-semibold text-gray-500 dark:text-slate-400 text-center w-16">Delivered</span>
          </div>
        </div>
      </div>

      {/* DELIVERY AGENT CARD */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-4 flex items-center justify-between mb-6 transition-colors">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-[#E8521A] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner">
            RK
          </div>
          <div className="ml-4">
            <p className="font-bold text-gray-800 dark:text-slate-100">Rajesh Kumar</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">⭐ 4.8 &middot; {delivered ? '0 km away' : '1.2 km away'} &middot; {delivered ? 'Arrived' : '~8 min'}</p>
          </div>
        </div>
        <button 
          onClick={() => alert("Calling Delivery Agent...")}
          className="w-10 h-10 bg-orange-50 dark:bg-orange-900/30 text-[#E8521A] rounded-full flex items-center justify-center hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
        >
          📞
        </button>
      </div>

      {/* TIFFIN CONTENTS */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors">
        <button 
          onClick={() => setItemsOpen(!itemsOpen)}
          className="w-full px-5 py-4 flex justify-between items-center bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
        >
          <span className="font-semibold text-gray-800 dark:text-slate-100">What's in your tiffin today</span>
          <span className={`transform transition-transform dark:text-slate-100 ${itemsOpen ? 'rotate-180' : ''}`}>▼</span>
        </button>
        
        {itemsOpen && (
          <div className="p-5 border-t border-gray-100 dark:border-slate-700">
            {cartList.length > 0 ? (
              <ul className="space-y-3">
                {cartList.map((item, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 text-[#E8521A] dark:text-orange-400 rounded flex items-center justify-center font-bold text-xs mr-3">
                      {item.quantity}x
                    </div>
                    <span className="font-medium text-gray-700 dark:text-slate-300">{item.meal.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-slate-400 text-sm">Dummy Tiffin Order</p>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default TrackingPage;
