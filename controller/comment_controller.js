const CrudOperations = require("../utils/crud_operations")
const PostModel = require("../model/post_model")


exports.addComment = async (req, res, next) => {

    const data = await CrudOperations.getOneElement(req, res, next, PostModel.PostMdoel, {"_id": req.body["post_id"]})
    if (!(data["data"])) {
        return res.status(404).json({"res": "No post found to add comment"})
    }

    const post = data["data"]

    if (!post["available_post"]) {
        return res.status(403).json({"res": "You cant add comment in this post"})
    }

    req.body["user_id"] = req.body.user["_id"]
    const data2 = await CrudOperations.addElement(req, res, next, PostModel.CommentMdoel)
    return res.status(200).json(data2)

}

exports.removeComment = async (req, res, next) => {

    const comment = await PostModel.CommentMdoel.findOne({"_id": req.body["comment_id"]})
    if (!comment) {
        return res.status(404).json({"res": "comment no found"})
    }

    if (req.body["user"]["_id"].toString() !== comment["user_id"].toString()) {
        return res.status(404).json({"res": "You are not the creator of this comment"});
    }

    const commentRes = await CrudOperations.removeElement(req, res, next, PostModel.CommentMdoel)
    return res.status(200).json(commentRes)

}

exports.updateComment = async (req, res, next) => {
    const filter = {"_id": req.body["comment_id"]}

    const comments = await PostModel.CommentMdoel.find(filter)

    if (comments.length === 0) {
        return res.status(404).json({"res": "comment no found"})
    }

    if (req.body["user"]["_id"].toString() !== comments[0]["user_id"].toString()) {
        return res.status(404).json({"res": "You are not the creator of this comment"});
    }

    const comment = await CrudOperations.updateOneElement(req, res, next, PostModel.CommentMdoel, filter, req.body)
    return res.status(200).json(comment)

}