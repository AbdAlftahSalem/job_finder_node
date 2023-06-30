const express = require("express")
// const validator = require("../utils/validators/category_validator")
const Auth = require("../controller/auth_controllers")

const {
    addComment, removeComment, updateComment
} = require("../controller/comment_controller")


const router = express.Router();


router.route("/add-comment").post(Auth.protectRout, addComment)
router.route("/comment-remove").post(Auth.protectRout, removeComment)
router.route("/comment-update").post(Auth.protectRout, updateComment)
module.exports = router;
