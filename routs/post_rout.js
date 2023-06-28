const express = require("express")
const validator = require("../utils/validators/posts_validator")
const AuthController = require("../controller/auth_controllers")
const PostController = require("../controller/post_controller")

const {
    getPosts, addPost, removePost, updatePost
} = require("../controller/post_controller")


const router = express.Router();


router.route("/posts").post(AuthController.protectRout, validator.addPost, addPost)
router.route("/posts").get(AuthController.protectRout, getPosts)
router.route("/posts-remove").post(AuthController.protectRout, validator.removePost, removePost)
router.route("/posts-update").post(AuthController.protectRout, validator.removePost, updatePost)
module.exports = router;
