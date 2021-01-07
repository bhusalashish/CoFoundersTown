import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";

const Register = (props) => {
    const [user, setUser] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
    });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        };
    }, []);

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setUser({
            username: "",
            password: "",
            first_name: "",
            last_name: "",
            email: "",
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        AuthService.register(user).then((data) => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if (!message.msgError) {
                timerID = setTimeout(() => {
                    props.history.push("/login");
                }, 500);
            }
        });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h3>Please Register</h3>
                <label htmlFor="first_name" className="sr-only">
                    First name:{" "}
                </label>
                <input
                    type="text"
                    name="first_name"
                    value={user.first_name}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Enter first name"
                />
                <label htmlFor="last_name" className="sr-only">
                    Last Name:{" "}
                </label>
                <input
                    type="text"
                    name="last_name"
                    value={user.last_name}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Enter Last Name"
                />
                <label htmlFor="username" className="sr-only">
                    Username:{" "}
                </label>
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Enter Username"
                />
                <label htmlFor="email" className="sr-only">
                    Email:{" "}
                </label>
                <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Enter E-mail"
                />
                <label htmlFor="password" className="sr-only">
                    Password:{" "}
                </label>
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Enter Password"
                />
                <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                >
                    Register
                </button>
            </form>
            {message ? <Message message={message} /> : null}
        </div>
    );
};

export default Register;
