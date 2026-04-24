import React from 'react';

const QuantitySelector = ({ quantity = 1, onIncrease, onDecrease, min = 1, max = 99 }) => {
  return (
    <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1 w-fit">
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-bold text-lg"
      >
        −
      </button>

      <span className="w-8 text-center font-bold text-gray-900">{quantity}</span>

      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-bold text-lg"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
