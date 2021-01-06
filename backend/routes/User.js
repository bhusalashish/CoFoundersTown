// Import the necessary packages
const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");

// import user-defidned modules or Schema
const User = require("../models/User");
const Article = require("../models/Article");

const signToken = (userID) => {
    return JWT.sign(
        {
            iss: "AshishBlog",
            sub: userID,
        },
        process.env.SECRETORKEY,
        { expiresIn: "1h" }
    );
};

userRouter.post("/register", (req, res) => {
    const {
        username,
        email,
        first_name,
        last_name,
        password,
        date_of_birth,
    } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err) {
            res.status(500).json({
                message: { msgBody: "Error has occured", msgError: true },
            });
        } else if (user)
            res.status(400).json({
                message: {
                    msgBody: "Username is already taken",
                    msgError: true,
                },
            });
        else {
            const newUser = new User({
                username,
                email,
                name: {
                    first_name,
                    last_name,
                },
                password,
                date_of_birth,
            });
            newUser.save((err) => {
                if (err)
                    res.status(500).json({
                        message: {
                            msgBody: "Error has occured",
                            msgError: true,
                        },
                    });
                else
                    res.status(201).json({
                        message: {
                            msgBody: "Account successfully created",
                            msgError: false,
                        },
                    });
            });
        }
    });
});

userRouter.post(
    "/login",
    passport.authenticate("local", { session: false }),
    (req, res) => {
        if (req.isAuthenticated()) {
            const { _id, username } = req.user;
            const token = signToken(_id);
            res.cookie("access_token", token, {
                httpOnly: true,
                sameSite: true,
            });
            res.status(200).json({
                isAuthenticated: true,
                user: req.user,
            });
        }
    }
);

userRouter.get(
    "/logout",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.clearCookie("access_token");
        res.json({ user: "", success: true });
    }
);

userRouter.get(
    "/:username",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        if (req.params.username !== req.user.username) {
            res.status(401).json({
                message: {
                    msgBody: "User not authorized",
                    msgError: true,
                },
            });
        } else {
            User.findById({ _id: req.user._id })
                .populate("articles")
                .exec((err, document) => {
                    if (err)
                        res.status(500).json({
                            message: {
                                msgBody: "Error has occured",
                                msgError: true,
                            },
                        });
                    else {
                        res.status(200).json({
                            user: req.user,
                            articles: document.articles,
                            authenticated: true,
                        });
                    }
                });
        }
    }
);

// userRouter.get(
//     "/admin",
//     passport.authenticate("jwt", { session: false }),
//     (req, res) => {
//         if (req.user.role === "admin") {
//             res.status(200).json({
//                 message: { msgBody: "You are an admin", msgError: false },
//             });
//         } else
//             res.status(403).json({
//                 message: {
//                     msgBody: "You're not an admin,go away",
//                     msgError: true,
//                 },
//             });
//     }
// );

// userRouter.get(
//     "/authenticated",
//     passport.authenticate("jwt", { session: false }),
//     (req, res) => {
//         const { username, role } = req.user;
//         res.status(200).json({
//             isAuthenticated: true,
//             user: { username, role },
//         });
//     }
// );

module.exports = userRouter;
