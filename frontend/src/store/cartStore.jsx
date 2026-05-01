// src/store/cartStore.js
import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [orderId, setOrderId] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [deliverySlot, setDeliverySlot] = useState(null);

  const addToCart = (meal) => {
    setCartItems(prev => {
      const existing = prev[meal.id];
      return {
        ...prev,
        [meal.id]: {
          meal,
          quantity: existing ? existing.quantity + 1 : 1
        }
      };
    });
    // Dispatch custom event for Toast notification
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('itemAddedToCart', { detail: { mealName: meal.name } }));
    }
  };

  const removeFromCart = (id) => {
    setCartItems(prev => {
      const newItems = { ...prev };
      delete newItems[id];
      return newItems;
    });
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          quantity: qty
        }
      };
    });
  };

  const clearCart = () => {
    setCartItems({});
  };

  const { totalItems, totalCalories, totalProtein, totalPrice } = useMemo(() => {
    let items = 0;
    let calories = 0;
    let protein = 0;
    let price = 0;

    Object.values(cartItems).forEach(item => {
      items += item.quantity;
      calories += item.meal.cal * item.quantity;
      protein += item.meal.protein * item.quantity;
      price += item.meal.price * item.quantity;
    });

    return {
      totalItems: items,
      totalCalories: calories,
      totalProtein: protein,
      totalPrice: price
    };
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalCalories,
    totalProtein,
    totalPrice,
    setCartItems,
    orderId,
    setOrderId,
    orderPlaced,
    setOrderPlaced,
    selectedPlan,
    setSelectedPlan,
    deliverySlot,
    setDeliverySlot
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartStore = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartStore must be used within a CartProvider');
  }
  return context;
};
