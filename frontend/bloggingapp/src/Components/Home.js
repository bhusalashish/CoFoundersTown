import React, { useState, useEffect } from "react";
import Article from "./Article";
import HomeService from "../Services/HomeService";

const Home = () => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        HomeService.getBlogs().then((data) => {
            setArticles(data.articles);
            console.log(data);
        });
    }, []);
    return (
        <div>
            <h1>Welcome To Blogging Website</h1>
            <ul className="list-group">
                {articles.map((article) => {
                    return <Article key={article._id} article={article} />;
                })}
            </ul>
        </div>
    );
};

export default Home;
