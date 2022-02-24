import * as api from "../api"
import { AUTH, AUTH_ERROR, AUTH_REQUEST } from "../constants/actionTypes"

export const signin = (formData, history) => async (dispatch) => {
    try {
        dispatch({ type: AUTH_REQUEST })
        const { data } = await api.signIn(formData)
        history.push("/")
        dispatch({ type: AUTH, payload: data })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        dispatch({ type: AUTH_REQUEST })
        const { data } = await api.signUp(formData)
        history.push("/")
        dispatch({ type: AUTH, payload: data })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}