const User = require("../model/user_model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const CrudOperations = require("../utils/crud_operations")

const env = require("dotenv");
env.config({path: "./config.env"})

exports.registerUser = async (req, res) => {

    const user = await User.create({
        "user_name": req.body.user_name,
        "email": req.body.email,
        "password": req.body.password,
        "categories": req.body.categories,
        "sub_categories": req.body.sub_categories,
    })

    const token = generateToken(user["_id"])
    res.status(200).json({date: user, token})
}

exports.loginUser = async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    if (!user) {
        return res.status(404).json({"status": false, "error": [{"msg": " Email or password incorrect"}]})
    } else {
        if (await bcrypt.compare(req.body.password, user["password"])) {
            const token = generateToken(user["_id"])
            return res.status(200).json({data: user, token})
        }
    }
    return res.status(404).json({"status": false, "error": [{"msg": " Email or password incorrect"}]})

}

exports.resetPassword = async (req, res, next) => {

    const password = req.body.password
    const newPassword = req.body["newPassword"]
    const confirmPassword = req.body["confirmPassword"]


    const checkUser = await CrudOperations.getOneElement(req, res, next, User, {"_id": req.body["user"]["_id"]})

    // check user in db
    if (!checkUser) {
        return res.status(404).json({"res": "user not found ..."})
    }

    // check new old password
    if (bcrypt.compare(password, req.body.user.password, 12)) {
        return res.status(400).json({"res": "user not found ..."})
    }

    // check new password == confirmPassword
    if (newPassword !== confirmPassword) {
        return res.status(400).json({"res": "password not match"})
    }

    if (bcrypt.compare(newPassword, req.body.user.password, 12)) {
        return res.status(400).json({"res": "You cant enter the same password"})
    }

    const update = await User.updateOne({"_id": checkUser["_id"]}, {"password": newPassword}, {returnOriginal: false});
    res.status(200).json(update)

}

exports.getMe = async (req, res) => {
    const user = await User.findById(req.body.user._id).populate("categories")
        .populate("sub_categories")
    if (!user) {
        res.status(404).json({"message": "user not found , please login again"})
    } else {
        res.status(200).json(user)

    }

}

exports.protectRout = async (req, res, next, role = []) => {
    try {
        //  get token form headers
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "You are not logged in", status: false,
            });
        }

        //  verify token if valid expired token
        const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);

        //  check if user in Database
        const currentUser = await User.findById(decodeToken.user_id);

        //  check found user success
        if (!currentUser) {
            return res.status(401).json({
                message: "You are not logged in", status: false,
            });
        }

        //  check role for user
        if (role.length !== 0 && !role.includes(currentUser["role"])) {
            return res.status(403).json({
                message: "You don't have permission to access this route", status: false,
            });
        }

        //  add user in body of request 
        req.body.user = currentUser;
        next();
    } catch (error) {
        return res.status(404).json({
            status: false, msg: "User not found",
        });
    }
};

const generateToken = (userId) => {
    return jwt.sign({user_id: userId}, process.env.TOKEN_SECRET, {
        expiresIn: "2h",
    })
}