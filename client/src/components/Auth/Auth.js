import React, { useEffect, useState } from 'react'
import { Avatar, Paper, Grid, Typography, Container, Button, CircularProgress } from "@material-ui/core"
import { GoogleLogin } from "react-google-login"
import useStyle from "./styles"
import Input from './Input'
import Icon from "./Icon"
import { useDispatch, useSelector } from 'react-redux'
import { AUTH } from '../../constants/actionTypes'
import { useHistory } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'
import { Alert } from '@material-ui/lab'
const Auth = () => {
    const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "", firstname: "", lastname: "" })
    const { isLoading, error } = useSelector(state => state.auth)
    const [errorMessage, setErrorMessage] = useState(false)

    const classes = useStyle()
    const dispatch = useDispatch()
    const history = useHistory()


    const [isSignup, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        //dispatch based on sign in or sign up
        if (isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        setErrorMessage(false)
    }


    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({ type: AUTH, payload: { result, token } })
            history.push("/")
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (res) => {
        console.log(res)
        console.log("Google Sign In was unsucessful. Please try again later")
    }

    useEffect(() => {
        if (error) {
            setErrorMessage(error)
        }
    }, [error])
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography>{isSignup ? "Sign Up" : "Sign In"}</Typography>
                {isLoading &&
                    (<div style={{ marginTop: "10px" }}>
                        <CircularProgress />
                    </div>)
                }

                {errorMessage &&
                    (<div style={{ marginTop: "10px" }}>
                        <Alert severity='error'>{errorMessage}</Alert>
                    </div>)
                }

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastname" label="Last Name" handleChange={handleChange} autoFocus half />
                                </>
                            )

                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {
                            isSignup && (
                                <>
                                    <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                                </>
                            )
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId="295743004445-d9vfmfpcs8u9fa6n1r6b5utvnagtf17v.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"

                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already have an account? Sign In" : "Don't have an account"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container >
    )
}

export default Auth