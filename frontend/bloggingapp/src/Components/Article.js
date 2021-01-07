import React from "react";

const Article = ({ article }) => {
    return (
        <li>
            <h1>{article.title}</h1>
            <h4>{article.body}</h4>
        </li>
    );
};

export default Article;
