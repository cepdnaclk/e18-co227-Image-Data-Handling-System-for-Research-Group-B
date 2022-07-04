const app = require("./index");

const db = require("./configurations/db");

// create/ connect with the database
db.connect();

// set an environmental variable in powershell --> $env:PORT = 5000
// environmental variable PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));
