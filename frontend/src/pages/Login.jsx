import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginSuccess } from '../features/auth/authSlice';
import { MOCK_USERS } from '../services/mockData';
import Logo from '../components/Logo';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const registerSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Name is too short').required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: isSignUp ? registerSchema : loginSchema,
    onSubmit: (values) => {
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        if (isSignUp) {
          // Register: create new mock user
          const newUser = {
            id: `u${Date.now()}`,
            name: values.name,
            email: values.email,
            plan: 'Basic',
            role: 'user',
          };
          dispatch(loginSuccess(newUser));
          navigate('/');
        } else {
          // Login: find user in mock data
          const found = MOCK_USERS.find(
            (u) => u.email === values.email
          );
          if (found) {
            dispatch(loginSuccess(found));
            navigate('/');
          } else {
            // Accept any credentials for demo
            const demoUser = {
              id: 'u_demo',
              name: values.email.split('@')[0],
              email: values.email,
              plan: 'Pro',
              role: 'user',
            };
            dispatch(loginSuccess(demoUser));
            navigate('/');
          }
        }
        setLoading(false);
      }, 800);
    },
  });

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    formik.resetForm();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gray-900 py-8 px-8 flex flex-col items-center text-center">
          <Link to="/" className="inline-block mb-3">
            <Logo lightText={true} />
          </Link>
          <p className="text-gray-300 text-sm">
            {isSignUp ? 'Create an account to get started' : 'Welcome back! Please sign in.'}
          </p>
        </div>

        <div className="p-8">
          <form className="space-y-5" onSubmit={formik.handleSubmit} autoComplete="off">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="name"
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none ${formik.touched.name && formik.errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                  placeholder="Rahul Sharma"
                />
                {formik.touched.name && formik.errors.name && <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="email"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none ${formik.touched.email && formik.errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                placeholder="you@example.com"
              />
              {formik.touched.email && formik.errors.email && <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                {!isSignUp && (
                  <span className="text-xs text-orange-600 font-medium cursor-pointer hover:text-orange-700">Forgot password?</span>
                )}
              </div>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="current-password"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none ${formik.touched.password && formik.errors.password ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                placeholder="••••••••"
              />
              {formik.touched.password && formik.errors.password && <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 border border-transparent rounded-lg shadow-md text-white bg-gray-900 hover:bg-black font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {isSignUp ? 'Creating Account...' : 'Signing In...'}
                </>
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              GitHub
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button
              type="button"
              onClick={toggleMode}
              className="font-bold text-orange-600 hover:text-orange-500 focus:outline-none"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
