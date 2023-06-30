const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "The title is required"],
        minLength: [3, "The min length is 3"],
        maxLength: [30, "The max length is 20"],
    },

    post_id: {
        type: mongoose.Schema.ObjectId, ref: "Posts", required: [true, "The post id is required"],
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "The user is required"],
    }


}, {timestamps: true})


module.exports = mongoose.model("Comments", CommentSchema)