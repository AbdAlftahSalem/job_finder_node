const express = require("express")
const validator = require("../utils/validators/comment_validator")
const Auth = require("../controller/auth_controllers")

const {
    addComment, removeComment, updateComment
} = require("../controller/comment_controller")


const router = express.Router();


router.route("/add-comment").post(Auth.protectRout, validator.addComment, addComment)
router.route("/comment-remove").post(Auth.protectRout, validator.removeComment, removeComment)
router.route("/comment-update").post(Auth.protectRout, validator.removeComment, updateComment)
module.exports = router;
