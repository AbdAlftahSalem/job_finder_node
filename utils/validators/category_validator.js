const {check} = require('express-validator');

const validator = require("../../middlewere/validator")

exports.addCategory = [


    check("title").notEmpty().withMessage("Enter valid title").isLength({
        min: 3,
        max: 20
    }).withMessage("Title should between 3 and 20 letter"),
    validator,
]
