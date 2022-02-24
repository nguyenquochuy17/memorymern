import * as api from '../api'
import { CREATE, UPDATE, COMMENT, DELETE, FETCH_ALL, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST } from "../constants/actionTypes"

//Action creator
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPosts(page)
        dispatch({ type: FETCH_ALL, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error.message)
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPost(id)
        dispatch({ type: FETCH_POST, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error.message)
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPostsBySearch(searchQuery)
        dispatch({ type: FETCH_BY_SEARCH, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.createPost(post)
        dispatch({ type: CREATE, payload: data })
        dispatch({ type: END_LOADING })
        history.push("/posts/" + data._id)
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (postId, updatedPost) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(postId, updatedPost)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = (postId) => async (dispatch) => {
    try {
        await api.deletePost(postId)
        dispatch({ type: DELETE, payload: postId })
    } catch (error) {
        console.log(error.message)
    }
}

export const likePost = (postId) => async (dispatch) => {
    try {
        const { data } = await api.likePost(postId)
        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const postComment = (comment, id, ref) => async (dispatch) => {
    try {
        const { data } = await api.comment(comment, id)
        dispatch({ type: COMMENT, payload: data })
        ref.current.scrollIntoView({ behavior: "smooth" })
    } catch (error) {
        console.log(error)
    }
}