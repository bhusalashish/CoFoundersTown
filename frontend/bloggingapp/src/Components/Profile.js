import React, { useState, useContext, useEffect } from "react";
import Article from "./Article";
import ProfileService from "../Services/ProfileService";
import { AuthContext } from "../Context/AuthContext";

const Profile = (props) => {
    const [user, setUser] = useState();
    const [articles, setArticles] = useState([]);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        if (authContext.isAuthenticated) {
            ProfileService.getProfile(authContext.user).then((data) => {
                setArticles(data.articles);
                setUser(data.user);
            });
        }
    }, [authContext.isAuthenticated, authContext.user]);

    function camelize(str) {
        // Split the string at all space characters
        return (
            str
                .split(" ")
                .map((a) => a.trim())
                // Convert first char to upper case for each word
                .map((a) => a[0].toUpperCase() + a.substring(1))
                .join(" ")
        );
    }

    return (
        <div>
            <h1>
                {camelize(
                    authContext.user.name.first_name +
                        " " +
                        authContext.user.name.last_name
                )}
                's
                {" Blogs"}
            </h1>
            {!articles.length ? "No Articles Published" : null}
            <ul className="list-group">
                {articles.map((article) => {
                    return <Article key={article._id} article={article} />;
                })}
            </ul>
        </div>
    );
};

export default Profile;
