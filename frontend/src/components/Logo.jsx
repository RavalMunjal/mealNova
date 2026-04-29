import React from 'react';

const Logo = ({ className = '', lightText = false }) => {
  return (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-orange-400 shadow-lg shadow-orange-500/30 overflow-hidden transform group-hover:scale-105 transition-all duration-300">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white z-10">
          <path d="M12 2C12.5523 2 13 2.44772 13 3V5.51869C16.892 6.27552 19.8227 9.47547 19.9953 13.5H4.00465C4.17726 9.47547 7.108 6.27552 11 5.51869V3C11 2.44772 11.4477 2 12 2Z" fill="currentColor"/>
          <path d="M22 15H2C1.44772 15 1 15.4477 1 16V17C1 18.1046 1.89543 19 3 19H21C22.1046 19 23 18.1046 23 17V16C23 15.4477 22.5523 15 22 15Z" fill="currentColor"/>
        </svg>
        <div className="absolute inset-0 bg-white/30 blur-md rounded-full transform -translate-x-6 -translate-y-6 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-700"></div>
      </div>
      <span className={`text-2xl font-extrabold tracking-tight ${lightText ? 'text-white' : 'text-gray-900'}`}>
        Meal<span className="text-orange-500">Nova</span>
      </span>
    </div>
  );
};

export default Logo;
