import React, { useContext } from "react";
import { AuthContext } from "./Contexts/AuthContextProvider";
import "./App.css";

function App() {
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
        AuthContext
    );
    console.log(user);
    console.log(isAuthenticated);
    return (
        <div className="App">
            <h1>Hey There</h1>
            User : {user}
            isAuthenticated : {isAuthenticated}
        </div>
    );
}

export default App;
