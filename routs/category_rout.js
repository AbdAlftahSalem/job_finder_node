const express = require("express")
const validator = require("../utils/validators/category_validator")
const {
    AddCategory, getAllCategories
} = require("../controller/category_controller")


const router = express.Router();


router.route("/get_categories").get(getAllCategories)
router.route("/add_categories").post(validator.addCategory, AddCategory)
module.exports = router;
