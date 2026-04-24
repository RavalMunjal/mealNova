import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { getInitials } from '../utils/helpers';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Munjal Raval',
    email: 'munjal@example.com',
    bio: 'Food lover and home chef. I love exploring new cuisines and planning healthy meals for my family.',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left - Avatar Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-orange-600 flex items-center justify-center text-3xl font-extrabold text-white mb-4 shadow-lg">
            {getInitials(profile.name)}
          </div>
          <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
          <p className="text-gray-500 text-sm mt-1">{profile.email}</p>

          <div className="w-full border-t border-gray-100 mt-6 pt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Meals Planned</span>
              <span className="font-bold text-gray-900">24</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Favourites</span>
              <span className="font-bold text-gray-900">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Orders</span>
              <span className="font-bold text-gray-900">8</span>
            </div>
          </div>
        </div>

        {/* Right - Edit Info */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-orange-600 font-bold text-sm hover:text-orange-700"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div className="space-y-5">
            <Input
              label="Full Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Your name"
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="your@email.com"
            />
            <div className="flex flex-col">
              <label className="mb-1.5 text-sm font-bold text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white transition-all resize-none disabled:opacity-70"
                placeholder="Tell us about yourself..."
              />
            </div>

            {isEditing && (
              <Button
                variant="primary"
                fullWidth
                onClick={() => setIsEditing(false)}
              >
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
