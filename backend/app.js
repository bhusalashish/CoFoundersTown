const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const uri = process.env.MONGODB_URI;
console.log(uri);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
