const mongoose = require("mongoose");

// database name --> co227testdb
mongoose
  .connect("mongodb://localhost/co227testdb", { useNewUrlParser: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err.message));