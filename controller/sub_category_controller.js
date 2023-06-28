const CrudOperations = require("../utils/crud_operations");
const SubCategoryModel = require("../model/sub_category");

exports.getAllSubCategories = async (req, res, next) => {
    console.log(req.body);
    const data = await CrudOperations.getAllData(req, res, next, SubCategoryModel, {"parent_id": req.body["parent_id"]});
    return res.status(200).json(data);
};

exports.AddSubCategory = async (req, res, next) => {
    const data = await CrudOperations.addElement(req, res, next, SubCategoryModel);
    return res.status(200).json(data);
};
