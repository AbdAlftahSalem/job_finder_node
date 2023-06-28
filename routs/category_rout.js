const express = require("express")
const AuthController = require("../controller/auth_controllers")

const {
    AddCategory, getAllCategories
} = require("../controller/category_controller")


const router = express.Router();


router.route("/get_categories").get(getAllCategories)
router.route("/add_categories").post(AddCategory)
module.exports = router;
