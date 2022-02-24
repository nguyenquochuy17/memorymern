import axios from 'axios'

const API = axios.create({ baseURL: "http://localhost:5000" })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('user')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
    }

    return req;
});

export const fetchPosts = (page) => API.get(`/post?page=${page}`)
export const fetchPost = (id) => API.get(`/post/${id}`)
export const fetchPostsBySearch = (searchQuery) => API.get(`/post/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post("/post", newPost)
export const updatePost = (postId, updatedPost) => API.patch("/post" + "/" + postId, updatedPost)
export const deletePost = (postId) => API.delete("/post" + "/" + postId)
export const likePost = (postId) => API.patch("/post" + "/" + postId + "/likePost")
export const comment = (comment, id) => API.post("/post" + "/" + id + "/commentPost", { comment })

export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)



