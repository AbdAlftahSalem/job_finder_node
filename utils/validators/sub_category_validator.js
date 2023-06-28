const {check} = require('express-validator');

const validator = require("../../middlewere/validator")
const Category = require("../../model/category_model")

exports.addSubCategory = [


    check("parent_id").notEmpty().withMessage("Enter valid id").custom((v) => {
        return Category.findById({_id: v}).then((r) => {
            if (!r) {
                return Promise.reject("Id not found");
            }
        })
    }).withMessage("Id not found"),
    validator
]
