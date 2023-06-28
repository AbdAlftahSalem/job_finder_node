const CrudOperations = require("../utils/crud_operations")
const PostModel = require("../model/post_model")

exports.getPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find({category_id: {$in: req.body.user["categories"]}}).exec();
        return res.status(200).json(posts)
    } catch (e) {
        return res.status(400).json({"res": e})
    }

}

exports.addPost = async (req, res, next) => {
    req.body.user_id = req.body.user["_id"]
    const post = await CrudOperations.addElement(req, res, next, PostModel)
    return res.status(200).json(post)

}