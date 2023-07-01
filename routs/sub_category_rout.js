const express = require("express")
const AuthController = require("../controller/auth_controllers")
const validator = require("../utils/validators/sub_category_validator")

const {
    AddSubCategory, getAllSubCategories, updateCategoriesForUser
} = require("../controller/sub_category_controller")
const Auth = require("../controller/auth_controllers");
const {uploadFile} = require("../middlewere/upload_file");


const router = express.Router();


router.route("/get_sub_categories").get(AuthController.protectRout, getAllSubCategories)
router.route("/add_sub_categories").post(((req, res, next) => Auth.protectRout(req, res, next, ["manager"])), (req, res, next,) => uploadFile(req, res, next, "image", ["png", "jpg", "jpeg"]), validator.addSubCategory, AddSubCategory)
router.route("/update_sub_category").put(((req, res, next,) => Auth.protectRout(req, res, next, ["manager"])), updateCategoriesForUser)
module.exports = router;
