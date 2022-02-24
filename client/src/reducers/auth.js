import { AUTH, LOGOUT, EXPIRE, AUTH_REQUEST, AUTH_ERROR } from "../constants/actionTypes"

const reducers = (state = {}, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return { isLoading: true }
        case AUTH:
            localStorage.setItem("user", JSON.stringify({ ...action?.payload }))
            return { authData: action?.payload, expire: false }
        case AUTH_ERROR:
            return { isLoading: false, error: action?.payload }
        case LOGOUT:
            localStorage.removeItem("user")
            return { authData: null, expire: false }
        case EXPIRE:
            localStorage.removeItem("user")
            return { authData: null, expire: action.payload }
        default:
            return state
    }
}

export default reducers