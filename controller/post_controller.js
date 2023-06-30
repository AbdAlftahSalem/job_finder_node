const CrudOperations = require("../utils/crud_operations")
const PostModel = require("../model/post_model")

exports.getPosts = async (req, res) => {
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

exports.removePost = async (req, res, next) => {

    const posts = await PostModel.find({"_id": req.body["post_id"]})

    if (posts.length === 0) {
        return res.status(404).json({"res": "post no found"})
    }

    if (req.body["user"]["_id"].toString() !== posts[0]["user_id"].toString()) {
        return res.status(404).json({"res": "You are not the creator of this post"});
    }

    const post = await CrudOperations.removeElement(req, res, next, PostModel)
    return res.status(200).json(post)

}

exports.updatePost = async (req, res, next) => {
    const filter = {"_id": req.body["post_id"]}

    const posts = await PostModel.find(filter)

    if (posts.length === 0) {
        return res.status(404).json({"res": "post no found"})
    }

    if (req.body["user"]["_id"].toString() !== posts[0]["user_id"].toString()) {
        return res.status(404).json({"res": "You are not the creator of this post"});
    }

    const post = await CrudOperations.updateOneElement(req, res, next, PostModel, filter, req.body)
    return res.status(200).json(post)

}