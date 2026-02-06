import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const [adding, setAdding] = useState(false);
    const [message, setMessage] = useState('');

    const handleAddToCart = async () => {
        setAdding(true);
        setMessage('');

        const result = await addToCart(product);

        if (result.success) {
            setMessage('✓ Added to cart!');
            setTimeout(() => setMessage(''), 2000);
        } else {
            setMessage('✗ Failed to add');
            setTimeout(() => setMessage(''), 3000);
        }

        setAdding(false);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                />
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-category">{product.category}</p>

                <div className="product-footer">
                    <span className="product-price">{formatPrice(product.price)}</span>

                    <button
                        className="add-to-cart-button"
                        onClick={handleAddToCart}
                        disabled={adding}
                    >
                        {adding ? 'Adding...' : 'Add to Cart'}
                    </button>
                </div>

                {message && (
                    <div className={`message ${message.includes('✓') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
