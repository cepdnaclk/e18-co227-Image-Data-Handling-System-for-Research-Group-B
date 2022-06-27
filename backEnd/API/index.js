const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const User = require("./models/User");

// create/ connect with the database
require("./configurations/db");

app.use(express.json());

// set an environmental variable in powershell --> $env:PORT = 5000
// environmental variable PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));

app.get("/", (req, res) => {
  res.send("Welcome to server!");
});

// post method to add a user to the database
app.post("/api/add-user", async (req, res) => {
  const newUser = await User({
    reg_no: req.body.reg_no,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  await newUser.save();
  console.log(newUser);
  res.json(newUser);
});

// get method to get a list of all users
app.get("/api/get-all", async (req, res) => {
  User.find({}, async (error, eachUser) => {
    if (error) {
      res.send({ messge: error });
      return;
    }
    res.json(eachUser);
  });
});

// import routes

// User Auth route
const userAuthRoute = require("./routes/user_authentication");
app.use("/api/auth", userAuthRoute);

// Admin route
const adminAcceptRoute = require("./routes/admin");
app.use("/api/admin", adminAcceptRoute);

// User route
const user = require("./routes/user");
app.use("/api/user", user);
