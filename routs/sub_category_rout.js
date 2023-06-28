const express = require("express")
const AuthController = require("../controller/auth_controllers")
const validator = require("../utils/validators/sub_category_validator")

const {
    AddSubCategory, getAllSubCategories
} = require("../controller/sub_category_controller")


const router = express.Router();


router.route("/get_sub_categories").get(getAllSubCategories)
router.route("/add_sub_categories").post(validator.addSubCategory ,AddSubCategory)
module.exports = router;
