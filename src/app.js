const express = require("express");
const helmet = require("helmet");
const connectDB = require("./db/mongoose");

const app = express();

//connect to database
connectDB();

//setup middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//setup route handlers

// setup static files for hosting
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like main.js on main.css file
  app.use(express.static("client/build"));

  // Express will serve up index.html file
  // if it doesn't recognise a route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
