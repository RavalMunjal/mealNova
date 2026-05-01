// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { SUBSCRIPTION_PLANS, DELIVERY_SLOTS, GST_RATE, DELIVERY_CHARGE } from '../utils/constants';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, selectedPlan, setSelectedPlan, deliverySlot, setDeliverySlot } = useCartStore();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    flatNo: '',
    area: '',
    city: 'Ahmedabad',
    pincode: '',
    instructions: ''
  });
  const [errors, setErrors] = useState({});

  const cartList = Object.values(cartItems);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handlePlaceOrder = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
    if (!formData.flatNo.trim()) newErrors.flatNo = 'Flat/House No is required';
    if (!formData.area.trim()) newErrors.area = 'Area & Street is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    
    if (!selectedPlan) newErrors.plan = 'Please select a subscription plan';
    if (!deliverySlot) newErrors.slot = 'Please select a delivery slot';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    navigate('/payment');
  };

  const gstAmount = totalPrice * GST_RATE;
  const finalTotal = totalPrice + gstAmount + DELIVERY_CHARGE;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-playfair mb-8 dark:text-white">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* LEFT COLUMN */}
        <div className="space-y-8">
          
          {/* Section 1 - Delivery Address */}
          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">1. Delivery Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Full Name</label>
                <input 
                  type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#E8521A] bg-transparent dark:text-white ${errors.fullName ? 'border-red-400' : 'border-gray-300 dark:border-slate-600'}`}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Phone Number</label>
                <input 
                  type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#E8521A] bg-transparent dark:text-white ${errors.phone ? 'border-red-400' : 'border-gray-300 dark:border-slate-600'}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Flat/House No</label>
                <input 
                  type="text" name="flatNo" value={formData.flatNo} onChange={handleInputChange}
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#E8521A] bg-transparent dark:text-white ${errors.flatNo ? 'border-red-400' : 'border-gray-300 dark:border-slate-600'}`}
                />
                {errors.flatNo && <p className="text-red-500 text-xs mt-1">{errors.flatNo}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Area & Street</label>
                <input 
                  type="text" name="area" value={formData.area} onChange={handleInputChange}
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#E8521A] bg-transparent dark:text-white ${errors.area ? 'border-red-400' : 'border-gray-300 dark:border-slate-600'}`}
                />
                {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">City</label>
                <input 
                  type="text" name="city" value={formData.city} onChange={handleInputChange}
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#E8521A] bg-transparent dark:text-white ${errors.city ? 'border-red-400' : 'border-gray-300 dark:border-slate-600'}`}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Pincode</label>
                <input 
                  type="text" name="pincode" value={formData.pincode} onChange={handleInputChange}
                  className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#E8521A] bg-transparent dark:text-white ${errors.pincode ? 'border-red-400' : 'border-gray-300 dark:border-slate-600'}`}
                />
                {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
              </div>
            </div>
          </section>

          {/* Section 2 - Choose Plan */}
          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 relative transition-colors">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">2. Choose Plan</h2>
            {errors.plan && <p className="text-red-500 text-xs mb-2">{errors.plan}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SUBSCRIPTION_PLANS.map(plan => {
                const isSelected = selectedPlan?.id === plan.id;
                return (
                  <div 
                    key={plan.id}
                    onClick={() => { setSelectedPlan(plan); setErrors({...errors, plan: ''}); }}
                    className={`relative p-4 border rounded-xl cursor-pointer transition-all ${isSelected ? 'border-[#E8521A] bg-[#E8521A]/5 ring-1 ring-[#E8521A]' : 'border-gray-200 dark:border-slate-600 hover:border-[#E8521A]/50'}`}
                  >
                    {plan.tag && (
                      <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-[#E8521A] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                        {plan.tag}
                      </span>
                    )}
                    <h3 className="font-semibold text-lg dark:text-slate-100">{plan.label}</h3>
                    <p className="text-[#E8521A] font-bold mt-1">₹{plan.pricePerDay} <span className="text-sm font-normal text-gray-500 dark:text-slate-400">/day</span></p>
                    {plan.total && <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">Billed ₹{plan.total}</p>}
                    {plan.saving && (
                      <div className="mt-2 inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2 py-0.5 rounded font-medium">
                        Save {plan.saving}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3 - Delivery Time Slot */}
          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">3. Delivery Time Slot</h2>
            {errors.slot && <p className="text-red-500 text-xs mb-2">{errors.slot}</p>}
            <div className="flex flex-wrap gap-3">
              {DELIVERY_SLOTS.map(slot => (
                <button
                  key={slot}
                  onClick={() => { setDeliverySlot(slot); setErrors({...errors, slot: ''}); }}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${deliverySlot === slot ? 'bg-[#E8521A] text-white border-[#E8521A]' : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-600 hover:border-[#E8521A]/50'}`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </section>

          {/* Section 4 - Special Instructions */}
          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">4. Special Instructions (Optional)</h2>
            <textarea
              name="instructions" value={formData.instructions} onChange={handleInputChange}
              rows="3" placeholder="E.g., Please ring the bell, less spicy, etc."
              className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8521A] bg-transparent dark:text-white"
            />
          </section>
        </div>

        {/* RIGHT COLUMN - Order Summary */}
        <div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 sticky top-24 transition-colors">
            <h2 className="text-xl font-semibold mb-4 border-b dark:border-slate-700 pb-4 dark:text-white">Order Summary</h2>
            
            {cartList.length === 0 ? (
              <p className="text-gray-500 dark:text-slate-400">Your cart is empty.</p>
            ) : (
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {cartList.map((item) => (
                  <div key={item.meal.id} className="flex justify-between items-center text-sm">
                    <div>
                      <span className="font-medium dark:text-slate-100">{item.meal.name}</span>
                      <span className="text-gray-500 dark:text-slate-400 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-semibold dark:text-slate-100">₹{item.meal.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3 text-sm border-t dark:border-slate-700 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-slate-400">Subtotal</span>
                <span className="dark:text-slate-100">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-slate-400">GST (5%)</span>
                <span className="dark:text-slate-100">₹{gstAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-slate-400">Delivery</span>
                <span className="text-green-600 dark:text-green-400 font-medium">{DELIVERY_CHARGE === 0 ? 'Free' : `₹${DELIVERY_CHARGE}`}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
              <span className="text-lg font-bold dark:text-white">TOTAL</span>
              <span className="text-xl font-bold text-[#E8521A]">₹{finalTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={cartList.length === 0}
              className={`w-full mt-6 py-3 px-4 rounded-lg text-white font-semibold transition-colors ${cartList.length === 0 ? 'bg-gray-300 dark:bg-slate-700 dark:text-slate-500 cursor-not-allowed' : 'bg-[#E8521A] hover:bg-[#D44715]'}`}
            >
              Place Order &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
