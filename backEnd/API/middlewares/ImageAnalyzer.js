const { PythonShell } = require("python-shell");

function ImageAnalyzer(uri) {
  const options = {
    args: [uri],
  };
  PythonShell.run("./middlewares/pydom/index.py", options, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return result;
    }
  });
}

module.exports = ImageAnalyzer;
