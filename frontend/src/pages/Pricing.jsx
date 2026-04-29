import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SUBSCRIPTION_PLANS } from '../services/mockData';

const FAQ_ITEMS = [
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Yes! You can cancel, pause, or downgrade your plan at any time from your dashboard. No cancellation fees.',
  },
  {
    q: 'Can I skip a day if I don\'t need delivery?',
    a: 'Absolutely. You can skip any meal or entire day up to 6 PM the previous evening through the app.',
  },
  {
    q: 'Are there any hidden charges?',
    a: 'None at all. The price you see is what you pay — including packaging and standard delivery.',
  },
  {
    q: 'Can I customize my meals?',
    a: 'Yes! Pro and Premium users can swap any meal from our daily menu, and mark dietary preferences in their profile.',
  },
  {
    q: 'How fresh are the meals?',
    a: 'All meals are freshly prepared every morning and delivered within 2 hours of cooking — no reheating.',
  },
  {
    q: 'Is there a free trial?',
    a: 'We offer a 3-day trial for new users. Sign up and experience MealNova before committing to a plan.',
  },
];

const FEATURE_COMPARISON = [
  { feature: 'Meals per day', basic: '1', pro: '2', premium: '3' },
  { feature: 'Delivery days', basic: 'Mon–Fri (5)', pro: 'Mon–Sat (6)', premium: 'Mon–Sun (7)' },
  { feature: 'Meal customization', basic: 'Basic', pro: 'Full swap', premium: 'Unlimited' },
  { feature: 'Skip / Pause meals', basic: '✓', pro: '✓', premium: '✓' },
  { feature: 'Priority delivery', basic: '–', pro: '✓', premium: '✓' },
  { feature: 'Weekend delivery', basic: '–', pro: 'Sat only', premium: '✓' },
  { feature: 'Free dessert', basic: '–', pro: 'Weekend', premium: 'Daily' },
  { feature: 'Nutritionist consult', basic: '–', pro: '–', premium: '✓' },
  { feature: 'Premium packaging', basic: '–', pro: '–', premium: '✓' },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-4">{q}</span>
        <span className={`flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold transition-transform ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 bg-gray-50 animate-fade-in">
          <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
};

const Pricing = () => {
  const [billing, setBilling] = useState('monthly');

  const getPrice = (plan) => {
    if (billing === 'yearly') {
      return Math.round(plan.price * 0.8); // 20% off yearly
    }
    return plan.price;
  };

  return (
    <div className="py-8 max-w-6xl mx-auto">

      {/* Header */}
      <div className="text-center mb-14">
        <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-bold px-4 py-2 rounded-full mb-6">
          💎 Subscription Plans
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
          Choose a plan that fits your appetite. No hidden fees, cancel anytime.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center bg-gray-100 rounded-2xl p-1.5">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              billing === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              billing === 'yearly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Yearly
            <span className="bg-green-100 text-green-700 text-xs font-extrabold px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 ${
              plan.popular
                ? 'border-orange-400 shadow-2xl shadow-orange-100 scale-105'
                : 'border-gray-150 shadow-sm hover:shadow-xl'
            }`}
          >
            {plan.popular && (
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center text-sm font-extrabold py-2.5 tracking-wide">
                ⭐ MOST POPULAR
              </div>
            )}

            <div className={`p-8 ${plan.popular ? 'bg-gradient-to-b from-orange-50 to-white' : 'bg-white'}`}>
              {/* Plan header */}
              <div className="mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 ${
                  plan.name === 'Basic' ? 'bg-gray-100' :
                  plan.name === 'Pro' ? 'bg-orange-100' : 'bg-purple-100'
                }`}>
                  {plan.name === 'Basic' ? '🥗' : plan.name === 'Pro' ? '🍱' : '👑'}
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900">{plan.name}</h3>
                <p className="text-gray-500 text-sm mt-1">
                  {plan.mealsPerDay} meal{plan.mealsPerDay > 1 ? 's' : ''}/day • {plan.deliveryDays} days/week
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-extrabold text-gray-900">₹{getPrice(plan).toLocaleString()}</span>
                  <span className="text-gray-400 mb-2">/mo</span>
                </div>
                {billing === 'yearly' && (
                  <p className="text-green-600 text-sm font-bold mt-1">
                    ✅ Save ₹{((plan.price - getPrice(plan)) * 12).toLocaleString()}/year
                  </p>
                )}
                <p className="text-gray-400 text-xs mt-1">
                  ≈ ₹{Math.round(getPrice(plan) / 30)}/day
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.popular ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                    }`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/login"
                className={`block w-full py-3.5 text-center font-extrabold rounded-2xl transition-all hover:scale-[1.02] ${
                  plan.popular
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200 hover:shadow-xl'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                Get Started {billing === 'yearly' ? 'Yearly' : 'Monthly'}
              </Link>

              <p className="text-center text-xs text-gray-400 mt-3">No setup fee • Cancel anytime</p>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <section className="mb-20">
        <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-8">Compare Plans</h2>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 text-gray-600 font-semibold text-sm">Feature</th>
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <th key={plan.id} className={`px-6 py-4 text-center text-sm font-extrabold ${plan.popular ? 'text-orange-600' : 'text-gray-900'}`}>
                    {plan.popular && <span className="block text-xs text-orange-400 font-bold">Popular</span>}
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURE_COMPARISON.map((row, idx) => (
                <tr key={row.feature} className={`border-b border-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">{row.feature}</td>
                  {[row.basic, row.pro, row.premium].map((val, i) => (
                    <td key={i} className={`px-6 py-4 text-center text-sm ${
                      val === '–' ? 'text-gray-300' :
                      val === '✓' ? 'text-green-600 font-bold text-base' :
                      i === 1 ? 'text-orange-600 font-semibold' : 'text-gray-700 font-medium'
                    }`}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Frequently Asked Questions</h2>
          <p className="text-gray-500">Everything you need to know about MealNova plans.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl py-14 px-8 text-center text-white">
        <h2 className="text-3xl font-extrabold mb-4">Still not sure? Try free for 3 days.</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Experience MealNova risk-free. No credit card required for the trial.
        </p>
        <Link
          to="/login"
          className="inline-block px-10 py-4 bg-orange-600 text-white font-extrabold rounded-2xl hover:bg-orange-500 transition-all hover:scale-105 shadow-xl shadow-orange-600/30 text-lg"
        >
          Start Free Trial
        </Link>
        <p className="text-gray-500 text-xs mt-4">3-day free trial • No card needed • Cancel anytime</p>
      </section>
    </div>
  );
};

export default Pricing;
