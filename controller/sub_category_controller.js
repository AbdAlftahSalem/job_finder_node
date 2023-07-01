const CrudOperations = require("../utils/crud_operations");
const SubCategoryModel = require("../model/sub_category");
const UserModel = require("../model/user_model");
const {ApiError} = require("../utils/error_handeler");

exports.getAllSubCategories = async (req, res, next) => {
    console.log(req.body);
    const data = await CrudOperations.getAllData(req, res, next, SubCategoryModel, {"parent_id": req.body["parent_id"]});
    return res.status(200).json(data);
};

exports.AddSubCategory = async (req, res, next) => {
    req.body.image = req.file
    const data = await CrudOperations.addElement(req, res, next, SubCategoryModel);
    return res.status(200).json(data);
};

exports.updateCategoriesForUser = async (req, res, next) => {

    if (!req.body.sub_categories) {
        return res.status(400).json({"response": "sub category are required"})
    }
    req.body.user.sub_categories = req.body.sub_categories
    const data = await CrudOperations.updateOneElement(req, res, next, UserModel, {"_id": req.body.user["_id"]}, req.body.user)
    return res.status(200).json(data)
}