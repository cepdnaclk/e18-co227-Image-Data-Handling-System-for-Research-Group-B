const express = require("express");
const app = express();
const path = require("path");
const User = require("./models/User");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to server!" });
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

// User patient
const patient = require("./routes/patient");
app.use("/api/patient", patient);

// import iamges rout
const upload = require("./routes/upload");
app.use("/api/upload/images", upload);

module.exports = app;
