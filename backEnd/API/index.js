const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const User = require("./models/User");
require("./configurations/db");

app.use(express.json());

// set an environmental variable in powershell --> $env:PORT = 5000
// environmental variable PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));


app.get("/", (req, res) => {
  res.send("Welcome to server!");
});
