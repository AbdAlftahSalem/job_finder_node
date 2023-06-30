const CrudOperations = require("../utils/crud_operations")
const PostModel = require("../model/post_model")


exports.addComment = async (req, res, next) => {

    console.log(req.body["post_id"])
    const data = await CrudOperations.getOneElement(req, res, next, PostModel.PostMdoel, {"_id": req.body["post_id"]})
    if (!(data["data"])) {
        return res.status(404).json({"res": "No post found to add comment"})
    }

    const post = data["data"]

    if (!post["available_post"]) {
        return res.status(403).json({"res": "You cant add comment in this post"})
    }

    const data2 = await CrudOperations.addElement(req, res, next, PostModel.CommentMdoel)
    return res.status(200).json(data2)

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