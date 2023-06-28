const express = require("express")
const AuthController = require("../controller/auth_controllers")
const validator = require("../utils/validators/sub_category_validator")

const {
    AddSubCategory, getAllSubCategories
} = require("../controller/sub_category_controller")
const Auth = require("../controller/auth_controllers");


const router = express.Router();


router.route("/get_sub_categories").get(AuthController.protectRout, getAllSubCategories)
router.route("/add_sub_categories").post(validator.addSubCategory, ((req, res, next,) => Auth.protectRout(req, res, next, ["manager"])), AddSubCategory)
module.exports = router;
