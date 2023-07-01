const {body} = require('express-validator');

const validator = require("../../middlewere/validator")

exports.addCategory = [
    body('title')
        .notEmpty()
        .withMessage('Enter a valid title')
        .isLength({min: 3, max: 20})
        .withMessage('Title should be between 3 and 20 characters'),
    validator,
];