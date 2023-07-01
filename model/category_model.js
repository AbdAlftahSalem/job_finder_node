const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "The title category is required"],
        minLength: [3, "The min length is 3"],
        maxLength: [20, "The max length is 20"],
    },
    image: {
        type: String,
        required: [true, "The category image is required"],
    }


}, {timestamps: true})


module.exports = mongoose.model("Categories", CategorySchema)