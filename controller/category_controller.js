const CrudOperations = require("../utils/crud_operations")
const CategoryModel = require("../model/category_model")

exports.getAllCategories = async (req, res, next) => {
    const data = await CrudOperations.getAllData(req, res, next, CategoryModel);
    return res.status(200).json(data)
}

exports.AddCategory = async (req, res, next) => {
    const data = await CrudOperations.addElement(req, res, next, CategoryModel);
    return res.status(200).json(data)
}
