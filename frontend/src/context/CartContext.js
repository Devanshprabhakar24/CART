import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    // Fetch cart items from backend
    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/cart`);
            const data = await response.json();
            if (data.success) {
                setCartItems(data.data);
            }
        } catch (err) {
            setError('Failed to fetch cart');
            console.error('Error fetching cart:', err);
        } finally {
            setLoading(false);
        }
    };

    // Add item to cart
    const addToCart = async (product) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${API_URL}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                }),
            });

            const data = await response.json();

            if (data.success) {
                setCartItems(data.data);
                return { success: true, message: 'Item added to cart' };
            } else {
                throw new Error(data.error?.message || 'Failed to add item');
            }
        } catch (err) {
            const errorMsg = err.message || 'Failed to add item to cart';
            setError(errorMsg);
            console.error('Error adding to cart:', err);
            return { success: false, message: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    // Update item quantity
    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${API_URL}/cart/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });

            const data = await response.json();

            if (data.success) {
                setCartItems(data.data);
            } else {
                throw new Error(data.error?.message || 'Failed to update quantity');
            }
        } catch (err) {
            setError(err.message || 'Failed to update quantity');
            console.error('Error updating quantity:', err);
        } finally {
            setLoading(false);
        }
    };

    // Remove item from cart
    const removeFromCart = async (itemId) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${API_URL}/cart/${itemId}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                setCartItems(data.data);
            } else {
                throw new Error(data.error?.message || 'Failed to remove item');
            }
        } catch (err) {
            setError(err.message || 'Failed to remove item');
            console.error('Error removing from cart:', err);
        } finally {
            setLoading(false);
        }
    };

    // Clear entire cart
    const clearCart = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${API_URL}/cart`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                setCartItems([]);
            }
        } catch (err) {
            setError('Failed to clear cart');
            console.error('Error clearing cart:', err);
        } finally {
            setLoading(false);
        }
    };

    // Calculate total
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Get cart count
    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const value = {
        cartItems,
        loading,
        error,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
        fetchCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
