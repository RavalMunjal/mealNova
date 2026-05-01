import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/auth/authSlice';
import { getInitials } from '../utils/helpers';
import Input from '../components/Input';
import Button from '../components/Button';
import { SUBSCRIPTION_PLANS } from '../services/mockData';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);
  const { weekPlan } = useSelector((state) => state.planner);

  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // Avatar Upload State
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [avatarFile, setAvatarFile] = useState(null);

  const [form, setForm] = useState({
    name: user?.name || 'MealNova User',
    email: user?.email || 'user@example.com',
    bio: 'Food lover and home chef. I love exploring authentic Indian cuisine and planning healthy meals.',
    phone: '+91 98765 43210',
    city: 'Mumbai',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (JPEG, PNG, etc).');
      return;
    }

    // Validate size (Max 2MB)
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      toast.error('Image is too large. Maximum size is 2MB.');
      return;
    }

    setAvatarFile(file);

    // Read and preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSave = () => {
    // In a real app, you would upload the avatarFile to a cloud storage here
    // e.g. await uploadAvatar(avatarFile)
    
    dispatch(updateProfile({ name: form.name, email: form.email, avatar: avatarPreview }));
    setIsEditing(false);
    setSaved(true);
    toast.success('Profile updated successfully!');
    setTimeout(() => setSaved(false), 2000);
  };

  const plannedMealsCount = Object.values(weekPlan).reduce((total, day) => {
    return total + Object.values(day).filter(Boolean).length;
  }, 0);

  const currentPlan = SUBSCRIPTION_PLANS.find((p) => p.name === (user?.plan || 'Basic')) || SUBSCRIPTION_PLANS[0];

  return (
    <div className="py-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        {saved && (
          <span className="bg-green-100 text-green-700 font-bold text-sm px-4 py-2 rounded-full animate-fade-in">
            ✓ Profile saved!
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left - Avatar Card */}
        <div className="space-y-5">
          {/* Avatar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
            <div 
              className={`relative mb-4 ${isEditing ? 'cursor-pointer hover:opacity-90' : ''}`}
              onClick={triggerFileInput}
              title={isEditing ? 'Click to change avatar' : ''}
            >
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              
              {avatarPreview ? (
                <img 
                  src={avatarPreview} 
                  alt={form.name} 
                  className="w-24 h-24 rounded-full object-cover shadow-lg shadow-orange-200 border-2 border-orange-500" 
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-3xl font-extrabold text-white shadow-lg shadow-orange-200">
                  {getInitials(form.name)}
                </div>
              )}

              {isEditing && (
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shadow-md z-10">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              )}
            </div>

            <h2 className="text-xl font-bold text-gray-900">{form.name}</h2>
            <p className="text-gray-500 text-sm mt-1">{form.email}</p>
            <span className="mt-2 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
              {user?.plan || 'Basic'} Plan
            </span>

            {/* Quick Stats */}
            <div className="w-full border-t border-gray-100 mt-5 pt-5 space-y-3">
              {[
                { label: 'Meals Planned', value: plannedMealsCount },
                { label: 'Cart Items', value: cartItems.length },
                { label: 'Member Since', value: '2024' },
              ].map((s) => (
                <div key={s.label} className="flex justify-between text-sm">
                  <span className="text-gray-500">{s.label}</span>
                  <span className="font-bold text-gray-900">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Plan */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg shadow-orange-200">
            <p className="text-orange-100 text-xs font-semibold uppercase tracking-wider mb-1">Current Plan</p>
            <h3 className="text-xl font-extrabold mb-3">{currentPlan.name}</h3>
            <ul className="space-y-1.5 mb-4">
              {currentPlan.features.slice(0, 3).map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-orange-100">
                  <span className="text-white">✓</span> {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-2 bg-white text-orange-600 font-bold rounded-xl text-sm hover:bg-orange-50 transition-colors">
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Right - Edit Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
              <button
                onClick={() => { setIsEditing(!isEditing); }}
                className={`text-sm font-bold px-4 py-2 rounded-xl transition-colors ${
                  isEditing
                    ? 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                    : 'text-orange-600 bg-orange-50 hover:bg-orange-100'
                }`}
              >
                {isEditing ? 'Cancel' : '✏️ Edit'}
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all disabled:opacity-60"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all disabled:opacity-60"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all disabled:opacity-60"
                    placeholder="+91 00000 00000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">City</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all disabled:opacity-60"
                    placeholder="Your city"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Bio</label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all resize-none disabled:opacity-60"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {isEditing && (
                <button
                  onClick={handleSave}
                  className="w-full py-3.5 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-md hover:scale-[1.01] transform"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>

          {/* Diet Preferences */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
            <h3 className="text-xl font-bold text-gray-900 mb-5">🥗 Diet Preferences</h3>
            <div className="flex flex-wrap gap-3">
              {['Vegetarian', 'High Protein', 'Low Calorie', 'South Indian', 'North Indian', 'Comfort Food'].map((pref) => (
                <button
                  key={pref}
                  className="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
