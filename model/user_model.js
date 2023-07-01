const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({

    user_name: {
        type: String,
        required: [true, "The username is required"],
        minLength: [3, "The min length is 3"],
        maxLength: [20, "The max length is 20"],
    },

    email: {
        type: String,
        required: [true, "The email is required"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "The email is required"],
        minLength: [6, "The min password length is 6"],
    },

    profile_picture: {
        type: String,
        default: null,
    },

    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories",
            default: null
        },

    ],

    sub_categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategories",
            default: null
        },
    ],

    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Posts",
            default: null
        },
    ],
    role: {
        type: String,
        enum: ["user", "admin", "manager"],
        default: "user",
    },
    cv: {
        type: String,
        default: null,
    }


}, {timestamps: true})


UserSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12)
    next();
})


module.exports = mongoose.model("User", UserSchema)