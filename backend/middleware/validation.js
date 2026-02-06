const { body, validationResult } = require('express-validator');

// Validation rules for cart items
const cartValidationRules = () => {
    return [
        body('productId')
            .notEmpty()
            .withMessage('Product ID is required')
            .isInt({ min: 1 })
            .withMessage('Product ID must be a positive integer'),
        body('quantity')
            .notEmpty()
            .withMessage('Quantity is required')
            .isInt({ min: 1, max: 99 })
            .withMessage('Quantity must be between 1 and 99'),
        body('name')
            .optional()
            .isString()
            .withMessage('Name must be a string'),
        body('price')
            .optional()
            .isFloat({ min: 0 })
            .withMessage('Price must be a positive number')
    ];
};

// Middleware to handle validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

module.exports = {
    cartValidationRules,
    validate
};
