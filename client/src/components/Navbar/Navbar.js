import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Typography, Avatar, Button, Snackbar } from '@material-ui/core'
import useStyles from "./styles"
import memory from "../../images/memories.png"
import { useDispatch, useSelector } from 'react-redux'
import { EXPIRE, LOGOUT } from '../../constants/actionTypes'
import Alert from '@material-ui/lab/Alert';

const Navbar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()


    const user = useSelector((state) => state.auth.authData)
    const expire = useSelector((state) => state.auth.expire)

    const logout = () => {
        dispatch({ type: LOGOUT })
    }

    const [open, setOpen] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        if (!open) {
            setOpen(true)
            dispatch({ type: EXPIRE, payload: false })
        }
    }, [open])
    return (
        <AppBar className={classes.appBar} position='static' color="inherit">
            {expire &&
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                        Your session already expired, please login again
                    </Alert>
                </Snackbar>
            }
            <div className={classes.brandContainer}>
                <Typography to="/" component={Link} className={classes.heading} variant="h4" align="center"> TravelPic</Typography>
                <img className={classes.image} src="/logotravel.jpeg" alt="memory" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result?.name} src={user?.result?.imageUrl}>{user?.result?.name?.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result?.name}</Typography>
                        <Button variant="contained" className={classes.logout} onClick={logout} color="secondary">
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar >
    )
}

export default Navbar