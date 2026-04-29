import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout, updateProfile } from '../features/auth/authSlice';

// Custom hook to access and manage auth state
const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, role } = useSelector((state) => state.auth);

  const handleLogout = () => dispatch(logout());
  const handleLogin = (userData) => dispatch(loginSuccess(userData));
  const handleUpdateProfile = (data) => dispatch(updateProfile(data));

  return {
    user,
    isAuthenticated,
    role,
    handleLogin,
    handleLogout,
    handleUpdateProfile,
  };
};

export default useAuth;
