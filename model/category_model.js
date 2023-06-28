const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const CategorySchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "The title category is required"],
        minLength: [3, "The min length is 3"],
        maxLength: [20, "The max length is 20"],
    },


}, {timestamps: true})


CategorySchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12)
    next();
})


module.exports = mongoose.model("Categories", CategorySchema)