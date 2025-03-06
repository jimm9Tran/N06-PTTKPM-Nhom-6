// src/context/CartContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { getCart, addToCart, updateCart, deleteFromCart } from '../services/cartService';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm lấy giỏ hàng từ backend
  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await getCart();
      setCart(response.data.cartDetail);
      setError(null);
    } catch (err) {
      console.error("Lỗi khi tải giỏ hàng:", err);
      setError("Lỗi khi tải giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Hàm thêm sản phẩm vào giỏ hàng
  const addProductToCart = async (productId, quantity = 1, size = "") => {
    try {
      await addToCart(productId, quantity, size);
      await fetchCart();
    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm:", err);
      setError("Lỗi khi thêm sản phẩm vào giỏ hàng");
    }
  };

  // Hàm cập nhật số lượng sản phẩm
  const updateProductQuantity = async (productId, quantity, size = "") => {
    try {
      await updateCart(productId, quantity, size);
      await fetchCart();
    } catch (err) {
      console.error("Lỗi khi cập nhật sản phẩm:", err);
      setError("Lỗi khi cập nhật sản phẩm");
    }
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeProductFromCart = async (productId, size = "") => {
    try {
      await deleteFromCart(productId, size);
      await fetchCart();
    } catch (err) {
      console.error("Lỗi khi xoá sản phẩm:", err);
      setError("Lỗi khi xoá sản phẩm khỏi giỏ hàng");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        fetchCart,
        addProductToCart,
        updateProductQuantity,
        removeProductFromCart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};