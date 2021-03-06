// Import the necessary packages
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Importing the user-defined modules here
const User = require("./models/User");

// create the instance of out app
const app = express();

// Make our app to use these
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

// Get the environment variables here
const PORT = process.env.PORT || 4000;

// Get the url string for mongoDB connection from environment variable
const uri = process.env.MONGODB_URI;

// MongoDB Connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, //used for index warning, remove this if this creates some errors
});

const connection = mongoose.connection;
connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});

const homeRouter = require("./routes/Home");
app.use("/", homeRouter);

const userRouter = require("./routes/User");
app.use("/user", userRouter);

const publishRouter = require("./routes/Publish");
app.use("/publish", publishRouter);

// Start the server in the specified port number which is there in the environment variable
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
