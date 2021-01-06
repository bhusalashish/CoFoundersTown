const express = require("express");
const publishRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");

// import user-defidned modules or Schema
const User = require("../models/User");
const Article = require("../models/Article");

publishRouter.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const newArticle = {
            ...req.body,
            author: req.user._id,
        };
        const article = new Article(newArticle);
        article.save((err) => {
            if (err)
                res.status(500).json({
                    message: { msgBody: "Error has occured", msgError: true },
                });
            else {
                req.user.articles.push(article);
                req.user.save((err) => {
                    if (err)
                        res.status(500).json({
                            message: {
                                msgBody: "Error has occured",
                                msgError: true,
                            },
                        });
                    else
                        res.status(200).json({
                            message: {
                                msgBody: "Successfully Published the Article",
                                msgError: false,
                            },
                        });
                });
            }
        });
    }
);

module.exports = publishRouter;
