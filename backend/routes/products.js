const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

// GET /api/products - Get all products
router.get('/', (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
});

// GET /api/products/:id - Get single product
router.get('/:id', (req, res, next) => {
    try {
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id === productId);

        if (!product) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
