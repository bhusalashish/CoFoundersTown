import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";

const Navbar = (props) => {
    let history = useHistory();
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
        AuthContext
    );

    const onClickLogoutHandler = () => {
        if (isAuthenticated) {
            AuthService.logout().then((data) => {
                if (data.status === 401) {
                    console.log("error");
                } else if (data.success) {
                    setUser(data.user);
                    setIsAuthenticated(false);
                    history.push("/");
                } else {
                    console.log("error");
                }
            });
        }
    };

    const unauthenticatedNavBar = () => {
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">Home</li>
                </Link>
                <Link to="/user/login">
                    <li className="nav-item nav-link">Login</li>
                </Link>
                <Link to="/user/register">
                    <li className="nav-item nav-link">Register</li>
                </Link>
            </>
        );
    };

    const authenticatedNavBar = () => {
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">Home</li>
                </Link>
                <Link to={`/user/${user.username}`}>
                    <li className="nav-item nav-link">Profile</li>
                </Link>
                <Link to="/publish">
                    <li className="nav-item nav-link">Publish</li>
                </Link>
                <button
                    type="button"
                    className="btn btn-link nav-item nav-link"
                    onClick={onClickLogoutHandler}
                >
                    Logout
                </button>
            </>
        );
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/">
                <div className="navbar-brand">Ashish Blogging</div>
            </Link>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    {!isAuthenticated
                        ? unauthenticatedNavBar()
                        : authenticatedNavBar()}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
