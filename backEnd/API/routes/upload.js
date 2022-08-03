const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const Image = require("../models/image");
const authenticateToken = require("../middlewares/auth");
const multer = require("multer");
const { PythonShell } = require("python-shell");
const ImageAnalyzer = require("../middlewares/ImageAnalyzer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = `../../../uploads/${req.params.folder}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const date = Date.now();
    cb(null, req.params.id + "_" + date + file.originalname);
  },
});

const upload = multer({ storage: storage }).array("images[]");

router.post("/:folder/:id/save", authenticateToken, async (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json(err);
    } else if (err) {
      return res.status(400).json(err);
    }

    const files = req.files;
    let count = 0;

    files.forEach((file, i) => {
      //join and get Full image path
      const relativeDir = `../${file.path}`;
      const Path = path.join(__dirname, relativeDir);

      const options = {
        args: [Path],
      };
      PythonShell.run(
        "../API/middlewares/pydom/index.py",
        options,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
            if (result < 0.75) {
              fs.unlink(Path, () => {
                count++;
                console.log("file removed " + count);
              });
            } else {
              const newImage = new Image({
                examiner_reg_no: req.user.email,
                patient_id: req.params.id,
                original: Path,
              });
              newImage.save();
            }
          }
        }
      );
    });
    return res.status(200).json({
      success: true,
      message: "images are uccessfully uploaded.",
      deleteCount: count,
    });
  });
});

module.exports = router;
