const CrudOperations = require("../utils/crud_operations")
const CategoryModel = require("../model/category_model")
const UserModel = require("../model/user_model");

exports.getAllCategories = async (req, res, next) => {
    const data = await CrudOperations.getAllData(req, res, next, CategoryModel);
    return res.status(200).json(data)
}

exports.AddCategory = async (req, res, next) => {
    req.body.image = req.file
    const data = await CrudOperations.addElement(req, res, next, CategoryModel);
    return res.status(200).json(data)
}


exports.updateSubCategoriesForUser = async (req, res, next) => {

    if (!req.body.categories) {
        return res.status(400).json({"response": "Category are required"})
    }
    req.body.user.categories = req.body.categories
    const data = await CrudOperations.updateOneElement(req, res, next, UserModel, {"_id": req.body.user["_id"]}, req.body.user)
    return res.status(200).json(data)
}