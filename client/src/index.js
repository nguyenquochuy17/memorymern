import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import App from './App'
import reducers from './reducers'
import decode from "jwt-decode"
import { EXPIRE } from "./constants/actionTypes"
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initState = {
    auth: {
        isLoading: false,
        error: false,
        authData: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
        expire: false
    }
}

const checkTokenExpirationMiddleware = store => next => action => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user?.token
    if (token) {
        const decodedToken = decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime())
            next({ type: EXPIRE, payload: true })
    }
    next(action);
};

const store = createStore(reducers, initState, composeEnhancer(applyMiddleware(checkTokenExpirationMiddleware, thunk)))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root"))