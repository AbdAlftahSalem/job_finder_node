const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "The title is required"],
        minLength: [3, "The min length is 3"],
        maxLength: [30, "The max length is 20"],
    },

    description: {
        type: String,
        required: [true, "The title is required"],
        minLength: [20, "The min length is 20"],
        maxLength: [1000, "The min length is 1000"]
    },

    available_post: {
        type: Boolean,
        default: true,
    },
    category_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Categories",
        required: [true, "The parent category is required"],
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "The user is required"],
    }


}, {timestamps: true})


module.exports = mongoose.model("Posts", PostSchema)