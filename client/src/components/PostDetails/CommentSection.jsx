import React, { useState, useRef } from "react"
import { Typography, TextField, Button } from "@material-ui/core"
import { useDispatch } from "react-redux"
import useStyles from "./styles"
import { postComment } from "../../actions/posts"

const CommentSection = ({ post }) => {
    const [comment, setComment] = useState("")
    const classes = useStyles()
    const dispatch = useDispatch()
    const commentRef = useRef()

    const user = JSON.parse(localStorage.getItem("user"))

    const handleClick = () => {
        const finalComment = `${user.result.name}: ${comment}`
        dispatch(postComment(finalComment, post._id, commentRef))
    }

    return (
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant="h6">Comments</Typography>
                {post.comments.map((c, i) => (
                    <Typography key={i} gutterBottom variant="subtitle1">
                        <strong>{c.split(":")[0]}</strong>: {c.split(":")[1]}
                    </Typography>
                ))}
                <div ref={commentRef}></div>
            </div>

            {user?.result?.name && (
                <div style={{ width: "50%" }}>
                    <Typography gutterBottom variant="h6">Write a Comment</Typography>
                    <TextField
                        fullWidth
                        rows={4}
                        variant="outlined"
                        label="Comment"
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button style={{ marginTop: "10px" }} fullWidth disabled={!comment} variant="contained" onClick={handleClick} color="primary">
                        Comment
                    </Button>
                </div>
            )}

        </div>
    )
}

export default CommentSection