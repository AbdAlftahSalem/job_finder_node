const express = require("express")
const validator = require("../utils/validators/auth_validator")
const AuthController = require("../controller/auth_controllers")

const {
    loginUser, registerUser, getMe, resetPassword, protectRout
} = require("../controller/auth_controllers")


const router = express.Router();


router.route("/register").post(validator.registerUser, registerUser)
router.route("/login").post(validator.loginUser, loginUser)
router.route("/reset_password").post(protectRout, resetPassword)
router.route("/get-me").get(AuthController.protectRout, getMe)
module.exports = router;
