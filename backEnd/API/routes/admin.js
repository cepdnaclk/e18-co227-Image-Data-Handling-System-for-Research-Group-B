const router = require("express").Router();
const User = require("../models/User");
const Request = require("../models/UserRequest");

// ************** get method to list all the signup requests *************************

router.get("/get-requests", async (req, res) => {
  Request.find({}, (error, request) => {
    if (error) {
      res.send({ message: error });
      return;
    }
    res.json(request);
  });
});



// **************** post method to accept a signup request *************************

router.post("/accept/:id", async (req, res) => {
  try {

    // check for the request with given id
    const request = await Request.findById(req.params.id);
    //console.log(request);

    if (request) {

      // avoid duplicate users
      const userByEmail = await User.findOne({ email: request.email });
      if (userByEmail)
        return res.status(401).send({ message: "Email already in use. Can't accept the request." });

      const userByRegno = await User.findOne({ reg_no: request.reg_no });
      if (userByRegno)
        return res.status(401).send({ message: "Registration Number already in use. Can't accept the request.",
        });

      // create new user
      const newUser = new User({
        email: request.email,
        reg_no: request.reg_no,
        password: request.password,
        username: request.username,
      });
      
      try {

        // add the new user to the database
        const addUser = await newUser.save();
        // const {password,...others} = addUser._doc;
        await Request.findByIdAndDelete(req.params.id);
        // others["message"] = "User registration successful!";

        return res.status(200).json({ message: "User registration successful!" });
      } catch (error) {
        return res.status(500).json({ message: "User registration failed" });
      }
    } else {
      return res.status(404).json({ message: "No Request Found!" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});


// **************** post method to reject a signup request *************************

router.post("/reject/:id", async (req, res) => {
  try {

    // check for the request with given id
    const request = await Request.findById(req.params.id);

    if (request) {
      
      try {

        // delete from Requests
        await Request.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Request successfully rejected!" });
      } catch (error) {
        return res.status(500).json({ message: "Request rejection failed!" });
      }
    } else {
      return res.status(404).json({ message: "No Request Found!" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});


module.exports = router;
