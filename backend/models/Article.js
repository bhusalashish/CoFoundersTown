// Import the necessary packages
const mongoose = require("mongoose");

const User = require("./User");
// Create Schema for Article
const AtricleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Article", AtricleSchema);
