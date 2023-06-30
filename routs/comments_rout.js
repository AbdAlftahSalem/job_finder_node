const express = require("express")
// const validator = require("../utils/validators/category_validator")
const Auth = require("../controller/auth_controllers")

const {
    addComment
} = require("../controller/comment_controller")


const router = express.Router();


router.route("/add-comment").post(Auth.protectRout, addComment)
module.exports = router;
