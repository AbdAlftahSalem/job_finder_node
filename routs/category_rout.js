const express = require("express")
const validator = require("../utils/validators/category_validator")
const Auth = require("../controller/auth_controllers")
const uploadFile = require("../middlewere/upload_file")
const {
    AddCategory, getAllCategories
} = require("../controller/category_controller")
const {updateCategoriesForUser} = require("../controller/sub_category_controller");


const router = express.Router();


router.route("/get_categories").get(Auth.protectRout, getAllCategories)
router.route("/update_category").put(Auth.protectRout, updateCategoriesForUser)
router.route("/add_categories").post(((req, res, next) => Auth.protectRout(req, res, next, ["manager"])), (req, res, next,) => uploadFile.uploadFile(req, res, next, "image", ["png", "jpg", "jpeg"]), validator.addCategory, AddCategory)
module.exports = router;
