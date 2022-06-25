const router = require("express").Router();
const User = require("../models/User");
const Request = require("../models/UserRequest");
const bcrypt = require("bcrypt");

/*************** post method to sign up a user to the database *****************************/

router.post("/signup", async (req, res) => {
  try {
    // if a user with same reg number has already sent a request
    const reqExisting = await Request.findOne({ reg_no: req.body.reg_no });
    if (reqExisting)
      return res
        .status(200)
        .json({ message: "The Request already sent. Wait for the approval" });

    // avoid duplicate users (409 conflict-request could not be processed because of conflict in the request )
    const userByEmail = await User.findOne({ email: req.body.email });
    const requestByEmail = await Request.findOne({ email: req.body.email });
    if (userByEmail || requestByEmail) {
      return res.status(409).json({ message: "This Email already in use." });
    }

    const userByRegno = await User.findOne({ reg_no: req.body.reg_no });
    const requestByRegno = await Request.findOne({ email: req.body.email });
    if (userByRegno || requestByRegno) {
      
      return res
        .status(409)
        .json({ message: "This Registration Number already in use." });
    }

    // encrypt the password - for security purposes
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUserReq = await Request({
      reg_no: req.body.reg_no,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,  // store the encrypted password
    });

    const user = await newUserReq.save();
    const { password } = user._doc;
    //others["message"] = "The Signup Request sent successfully. Wait for the approval";
    return res.status(200).json({
      message: "The Signup Request sent successfully. Wait for the approval",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

/****************** post method to login a user *****************************/

router.post("/login", async (req, res) => {
  try {
    // check whether the user has already signed up
    const userByEmail = await User.findOne({ email: req.body.email });
    if (!userByEmail) return res.status(400).json({ success: false, message: "Wrong credentials!" });

    const userByPassword = await bcrypt.compare(req.body.password,userByEmail.password)
    if(!userByPassword) return res.status(200).json({ success: false, message:"Wrong credentials!" })
    
    res.status(200).json({success: true, user: userByEmail});
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
