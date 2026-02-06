import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = ({ currentView, setCurrentView }) => {
    const { getCartCount } = useContext(CartContext);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand" onClick={() => setCurrentView('products')}>
                    <h1>Naksh Jewels</h1>
                    <p className="tagline">Exquisite Jewelry Collection</p>
                </div>

                <div className="navbar-menu">
                    <button
                        className={`nav-button ${currentView === 'products' ? 'active' : ''}`}
                        onClick={() => setCurrentView('products')}
                    >
                        Products
                    </button>

                    <button
                        className={`nav-button cart-button ${currentView === 'cart' ? 'active' : ''}`}
                        onClick={() => setCurrentView('cart')}
                    >
                        <span className="cart-icon">🛒</span>
                        Cart
                        {getCartCount() > 0 && (
                            <span className="cart-badge">{getCartCount()}</span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
