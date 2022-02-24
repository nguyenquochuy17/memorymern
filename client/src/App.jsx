import React from 'react';
import { Container } from "@material-ui/core"
import "./index.css"
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
const App = () => {

    return (
        <Router>
            <Container maxWidth="xl">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/posts" />} />
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" exact component={PostDetails} />
                    <Route path="/auth" exact component={() => (!(JSON.parse(localStorage.getItem("user"))) ? <Auth /> : <Redirect to="/posts" />)} />
                </Switch>
            </Container>
        </Router>
    )
};

export default App;
