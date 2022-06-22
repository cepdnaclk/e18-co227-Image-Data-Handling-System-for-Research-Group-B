const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/e18testdb2", { useNewUrlParser: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err.message));