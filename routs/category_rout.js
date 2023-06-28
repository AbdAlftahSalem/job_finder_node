const express = require("express")
const validator = require("../utils/validators/category_validator")
const Auth = require("../controller/auth_controllers")
const {
    AddCategory, getAllCategories
} = require("../controller/category_controller")


const router = express.Router();


router.route("/get_categories").get(Auth.protectRout, getAllCategories)
router.route("/add_categories").post(validator.addCategory, ((req, res, next,) => Auth.protectRout(req, res, next, ["manager"])), AddCategory)
module.exports = router;
