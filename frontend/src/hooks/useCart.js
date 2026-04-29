import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../features/cart/cartSlice';

// Custom hook to access and manage cart state
const useCart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalCalories = items.reduce((sum, item) => sum + item.calories * item.quantity, 0);

  const handleAdd = (item) => dispatch(addToCart(item));
  const handleRemove = (id) => dispatch(removeFromCart(id));
  const handleClear = () => dispatch(clearCart());

  return {
    items,
    total,
    totalItems,
    totalCalories,
    handleAdd,
    handleRemove,
    handleClear,
  };
};

export default useCart;
