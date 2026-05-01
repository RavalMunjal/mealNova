// src/pages/PaymentPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { GST_RATE, DELIVERY_CHARGE } from '../utils/constants';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { totalPrice, setOrderId, setOrderPlaced } = useCartStore();
  const [activeTab, setActiveTab] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  const finalTotal = (totalPrice + (totalPrice * GST_RATE) + DELIVERY_CHARGE).toFixed(2);

  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [upiId, setUpiId] = useState('');
  const [bank, setBank] = useState('');

  const banks = ['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB', 'Bank of Baroda', 'Canara Bank'];

  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    val = val.replace(/(.{4})/g, '$1 ').trim();
    setCardData({ ...cardData, number: val.substring(0, 19) });
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length >= 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    setCardData({ ...cardData, expiry: val });
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const randomOrderId = 'MN-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(randomOrderId);
      setOrderPlaced(true);
      navigate('/order-confirmation');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4 transition-colors">
      <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700 transition-colors">
        
        {/* Header */}
        <div className="bg-gray-50 dark:bg-slate-700/50 p-6 text-center border-b border-gray-100 dark:border-slate-700 transition-colors">
          <p className="text-gray-500 dark:text-slate-400 text-sm font-medium mb-1">Amount to pay</p>
          <h2 className="text-4xl font-bold text-[#E8521A]">₹{finalTotal}</h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-slate-700">
          {['UPI', 'Card', 'Net Banking'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === tab ? 'text-[#E8521A] border-b-2 border-[#E8521A]' : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'UPI' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">UPI ID</label>
                <input 
                  type="text" 
                  value={upiId} 
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="Enter UPI ID (e.g. name@upi)"
                  className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8521A] bg-transparent dark:text-white"
                />
              </div>
              <button 
                onClick={handlePay} 
                disabled={isProcessing || !upiId}
                className="w-full py-3 bg-[#E8521A] text-white rounded-lg font-semibold hover:bg-[#D44715] disabled:opacity-50 flex justify-center items-center h-12"
              >
                {isProcessing ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> : `Verify & Pay ₹${finalTotal}`}
              </button>
            </div>
          )}

          {activeTab === 'Card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Card Number</label>
                <input 
                  type="text" value={cardData.number} onChange={handleCardNumberChange} placeholder="0000 0000 0000 0000"
                  className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8521A] tracking-widest bg-transparent dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Expiry</label>
                  <input 
                    type="text" value={cardData.expiry} onChange={handleExpiryChange} placeholder="MM/YY"
                    className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8521A] bg-transparent dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">CVV</label>
                  <input 
                    type="password" value={cardData.cvv} onChange={(e) => setCardData({...cardData, cvv: e.target.value.replace(/\D/g, '').substring(0, 3)})} placeholder="***"
                    className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8521A] tracking-widest bg-transparent dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Cardholder Name</label>
                <input 
                  type="text" value={cardData.name} onChange={(e) => setCardData({...cardData, name: e.target.value})} placeholder="Name on card"
                  className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8521A] bg-transparent dark:text-white"
                />
              </div>
              <button 
                onClick={handlePay} 
                disabled={isProcessing}
                className="w-full py-3 bg-[#E8521A] text-white rounded-lg font-semibold hover:bg-[#D44715] disabled:opacity-50 mt-2 flex justify-center items-center h-12"
              >
                {isProcessing ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> : `Pay ₹${finalTotal} Securely`}
              </button>
            </div>
          )}

          {activeTab === 'Net Banking' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Select Bank</label>
                <select 
                  value={bank} onChange={(e) => setBank(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8521A] bg-white dark:bg-slate-900 dark:text-white"
                >
                  <option value="" disabled>Select your bank</option>
                  {banks.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <button 
                onClick={handlePay} 
                disabled={isProcessing || !bank}
                className="w-full py-3 bg-[#E8521A] text-white rounded-lg font-semibold hover:bg-[#D44715] disabled:opacity-50 mt-4 flex justify-center items-center h-12"
              >
                {isProcessing ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> : 'Proceed to Net Banking'}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-slate-700/50 py-4 text-center border-t border-gray-100 dark:border-slate-700 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-slate-400 transition-colors">
          <span>🔒</span> 100% Secure Payment &middot; SSL Encrypted
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
