const express = require("express")
const router = express.Router()

const posts = require("../controllers/posts")
const auth = require("../middleware/auth")

router.get("/", posts.getPosts)

router.get("/search", posts.getPostsBySearch)

router.get("/:id", posts.getPost)

router.post("/", auth, posts.createPost)

router.post("/:id/commentPost", auth, posts.commentPost)

router.patch("/:id", auth, posts.updatePost)

router.delete("/:id", auth, posts.deletePost)

router.patch("/:id/likePost", auth, posts.likePost)

module.exports = router