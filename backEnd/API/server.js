const fs = require("fs");
const app = require("./index");
const db = require("./configurations/db");

const dir = "../../../uploads/";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// create/ connect with the database
db.connect();

// set an environmental variable in powershell --> $env:PORT = 5000
// environmental variable PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));
