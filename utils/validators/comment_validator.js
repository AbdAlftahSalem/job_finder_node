const {check} = require('express-validator');

const validator = require("../../middlewere/validator")
const PostModel = require("../../model/post_model")

exports.addComment = [

    check("title")
        .isLength({min: 3})
        .withMessage("Too Short title"),

    check("post_id")
        .isMongoId()
        .withMessage("Enter valid post id"),

    validator,]


exports.removeComment = [check("post_id")
    .isMongoId()
    .withMessage("Enter valid id"), validator]

