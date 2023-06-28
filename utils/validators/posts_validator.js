const {check} = require('express-validator');

const validator = require("../../middlewere/validator")
const CategoryModel = require("../../model/category_model")
const {ApiError} = require("../error_handeler");
exports.addPost = [

    check("title")
        .isLength({min: 3})
        .withMessage("Too Short title")
        .isLength({max: 20}).withMessage("Too long title"),

    check("description")
        .isLength({min: 3})
        .withMessage("Too Short description")
        .isLength({max: 1000}).withMessage("Too long description"),

    check("category_id")
        .isMongoId()
        .withMessage("Enter valid id").custom(async (categoryId) => {
        const category = await CategoryModel.find({"_id": categoryId})
        if (category.length === 0) {
            throw new Error("Category not found")
        }
    }),
    validator,
]

