import React, { useState, useContext } from "react";
import PublishService from "../Services/PublishService";
import Message from "./Message";
import { AuthContext } from "../Context/AuthContext";

function Publish() {
    const [article, setArticle] = useState({ title: "", body: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onSubmit = (e) => {
        e.preventDefault();
        PublishService.publish(article).then((data) => {
            const { message } = data;
            resetForm();
            if (message.msgBody === "UnAuthorized") {
                setMessage(message);
                authContext.setUser({ username: "", role: "" });
                authContext.setIsAuthenticated(false);
            } else {
                setMessage(message);
            }
        });
    };

    const onChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setArticle({ title: "", body: "" });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="title">Enter title of the Blog</label>
                <input
                    type="text"
                    name="title"
                    value={article.title}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Enter title"
                />
                <label htmlFor="body">Enter title of the Blog</label>
                <input
                    type="text"
                    name="body"
                    value={article.body}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Enter body of the Blog Post"
                />
                <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                >
                    Submit
                </button>
            </form>
            {message ? <Message message={message} /> : null}
        </div>
    );
}

export default Publish;
