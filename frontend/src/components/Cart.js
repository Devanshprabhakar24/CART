import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
    const {
        cartItems,
        loading,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal
    } = useContext(CartContext);

    const [checkoutMessage, setCheckoutMessage] = useState('');

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            setCheckoutMessage('Cart is empty!');
            return;
        }
        setCheckoutMessage('✓ Proceeding to checkout...');
        setTimeout(() => setCheckoutMessage(''), 3000);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    if (loading) {
        return (
            <div className="cart-container">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading cart...</p>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="cart-container">
                <div className="empty-cart">
                    <div className="empty-cart-icon">🛒</div>
                    <h2>Your Cart is Empty</h2>
                    <p>Add some beautiful jewelry to your cart!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h2>Shopping Cart</h2>
                <button
                    className="clear-cart-button"
                    onClick={clearCart}
                >
                    Clear Cart
                </button>
            </div>

            <div className="cart-items">
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="cart-item-image"
                        />

                        <div className="cart-item-details">
                            <h3>{item.name}</h3>
                            <p className="cart-item-price">{formatPrice(item.price)}</p>
                        </div>

                        <div className="cart-item-actions">
                            <div className="quantity-controls">
                                <button
                                    className="quantity-button"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                >
                                    −
                                </button>
                                <span className="quantity-display">{item.quantity}</span>
                                <button
                                    className="quantity-button"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    disabled={item.quantity >= 99}
                                >
                                    +
                                </button>
                            </div>

                            <div className="cart-item-total">
                                {formatPrice(item.price * item.quantity)}
                            </div>

                            <button
                                className="remove-button"
                                onClick={() => removeFromCart(item.id)}
                                title="Remove item"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>{formatPrice(getCartTotal())}</span>
                </div>
                <div className="summary-row">
                    <span>Shipping:</span>
                    <span>Free</span>
                </div>
                <div className="summary-row total">
                    <span>Total:</span>
                    <span>{formatPrice(getCartTotal())}</span>
                </div>

                <button className="checkout-button" onClick={handleCheckout}>
                    Proceed to Checkout
                </button>

                {checkoutMessage && (
                    <div className={`message ${checkoutMessage.includes('✓') ? 'success' : 'error'}`}>
                        {checkoutMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
