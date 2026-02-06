const express = require('express');
const router = express.Router();
const { cartValidationRules, validate } = require('../middleware/validation');

// In-memory cart storage (simulates database)
let cart = [];

// GET /api/cart - Get cart items
router.get('/', (req, res, next) => {
    try {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        res.status(200).json({
            success: true,
            count: cart.length,
            total: total,
            data: cart
        });
    } catch (error) {
        next(error);
    }
});

// POST /api/cart - Add item to cart
router.post('/', cartValidationRules(), validate, (req, res, next) => {
    try {
        const { productId, quantity, name, price, image } = req.body;

        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(item => item.productId === productId);

        if (existingItemIndex !== -1) {
            // Update quantity if item exists
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            const cartItem = {
                id: Date.now(),
                productId,
                name,
                price,
                image,
                quantity
            };
            cart.push(cartItem);
        }

        res.status(201).json({
            success: true,
            message: 'Item added to cart successfully',
            data: cart
        });
    } catch (error) {
        next(error);
    }
});

// PUT /api/cart/:id - Update cart item quantity
router.put('/:id', (req, res, next) => {
    try {
        const cartItemId = parseInt(req.params.id);
        const { quantity } = req.body;

        // Validate quantity
        if (!quantity || typeof quantity !== 'number') {
            const error = new Error('Quantity is required and must be a number');
            error.statusCode = 400;
            throw error;
        }

        if (quantity < 1 || quantity > 99) {
            const error = new Error('Quantity must be between 1 and 99');
            error.statusCode = 400;
            throw error;
        }

        const itemIndex = cart.findIndex(item => item.id === cartItemId);

        if (itemIndex === -1) {
            const error = new Error('Cart item not found');
            error.statusCode = 404;
            throw error;
        }

        cart[itemIndex].quantity = quantity;

        res.status(200).json({
            success: true,
            message: 'Cart item updated successfully',
            data: cart
        });
    } catch (error) {
        next(error);
    }
});

// DELETE /api/cart/:id - Remove item from cart
router.delete('/:id', (req, res, next) => {
    try {
        const cartItemId = parseInt(req.params.id);
        const initialLength = cart.length;

        cart = cart.filter(item => item.id !== cartItemId);

        if (cart.length === initialLength) {
            const error = new Error('Cart item not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Item removed from cart successfully',
            data: cart
        });
    } catch (error) {
        next(error);
    }
});

// DELETE /api/cart - Clear entire cart
router.delete('/', (req, res, next) => {
    try {
        cart = [];
        res.status(200).json({
            success: true,
            message: 'Cart cleared successfully',
            data: cart
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
