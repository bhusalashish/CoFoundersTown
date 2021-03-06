import React, { useContext } from "react";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import Publish from "./Components/Publish";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

function App() {
    const authContext = useContext(AuthContext);
    return (
        <Router>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route path="/user/login" component={Login} />
            <Route path="/user/register" component={Register} />
            {authContext.isAuthenticated ? (
                <Route
                    path={`/user/${authContext.user.username}`}
                    component={Profile}
                />
            ) : null}
            <Route path="/publish" component={Publish} />
        </Router>
    );
}

export default App;
