const mongoose = require("mongoose")

const SubCategorySchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "The title category is required"],
        minLength: [3, "The min length is 3"],
        maxLength: [20, "The max length is 20"],
    },
    parent_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Categories",
        required: [true, "The parent category is required"],
    }
}, {timestamps: true})


module.exports = mongoose.model("SubCategories", SubCategorySchema)