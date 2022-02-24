const mongoose = require("mongoose");
const { findById, findByIdAndUpdate, update } = require("../models/postMessage");
const PostMessage = require("../models/postMessage")
const { cloudinary } = require("../utils/cloudinary")
module.exports.getPosts = async (req, res) => {
    const { page } = req.query
    try {
        const LIMIT = 8
        const startIndex = (Number(page) - 1) * LIMIT
        const total = await PostMessage.countDocuments({})
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPage: Math.ceil(total / LIMIT) })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports.getPost = async (req, res) => {
    const { id } = req.params
    try {
        const post = await PostMessage.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports.getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query
    try {
        const title = new RegExp(searchQuery, "i")
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] })

        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.createPost = async (req, res) => {
    const fileStr = req.body.selectedFile;
    if (fileStr) {
        try {
            var uploadedResponse = await cloudinary.uploader.upload(
                fileStr,
            )
        } catch (error) {
            res.status(500).json({ message: "upload image error" })
        }
    }
    try {
        const post = req.body
        const newPost = new PostMessage({ ...post, creator: req.userId, selectedFile: fileStr ? uploadedResponse.url : "" })
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

module.exports.updatePost = async (req, res) => {
    const fileStr = req.body.selectedFile;

    try {
        const postId = req.params.id
        const post = req.body
        if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send("No post with that id")
        const oldPost = await PostMessage.findById(postId)
        if (fileStr == oldPost.selectedFile) {
            const updatedPost = await PostMessage.findByIdAndUpdate(postId, post, { new: true })
            res.status(200).json(updatedPost)
        } else {
            try {
                var uploadedResponse = await cloudinary.uploader.upload(
                    fileStr,
                )
                const updatedPost = await PostMessage.findByIdAndUpdate(postId, { ...post, selectedFile: uploadedResponse.url }, { new: true })
                res.status(200).json(updatedPost)
            } catch (error) {
                res.status(500).json({ message: "upload image error" })
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send("No post with that id")
        await PostMessage.findByIdAndRemove(postId)
        res.json({ message: "Post delete sucessfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.likePost = async (req, res) => {
    try {
        const postId = req.params.id

        if (!req.userId) return res.json({ message: "Unauthenticated" })

        if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).send("No post with that id")

        const post = await PostMessage.findById(postId)

        const index = post.likes.findIndex((id) => id === String(req.userId))

        if (index == -1) {
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId))
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(postId, post, { new: true })

        res.status(203).json(updatedPost)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports.commentPost = async (req, res) => {

    const { id } = req.params
    const { comment } = req.body

    try {
        const post = await PostMessage.findById(id)

        post.comments.push(comment)

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}