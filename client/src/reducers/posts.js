import { CREATE, UPDATE, DELETE, FETCH_POST, FETCH_ALL, LIKE, FETCH_BY_SEARCH, START_LOADING, COMMENT, END_LOADING } from "../constants/actionTypes"

const reducers = (state = { isLoading: false, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPage: action.payload.numberOfPage
            }
        case FETCH_POST:
            return { ...state, post: action.payload }
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload }
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] }
        case UPDATE:
        case LIKE:
            const updatedPosts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
            return { ...state, posts: updatedPosts }
        case COMMENT:
            return {
                ...state,
                post: action.payload

            }
        case DELETE:
            const deletedPosts = state.posts.filter((post) => post._id !== action.payload)
            return { ...state, posts: deletedPosts }
        default:
            return state
    }
}

export default reducers