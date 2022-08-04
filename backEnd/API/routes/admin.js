const router = require("express").Router();
const User = require("../models/User");
const Request = require("../models/UserRequest");
const authenticateToken = require("../middlewares/auth");

// ************** get method to list all the signup requests *************************

router.get("/get-requests", authenticateToken, async (req, res) => {
  try {
    if (req.user.role.includes(1)) {
      const requests = await Request.find(
        {},
        { _id: 1, username: 1, reg_no: 1, email: 1 }
      );
      res.status(200).json(requests);
    } else {
      return res.status(200).json({
        message: "Unauthorized access. Only Admins can view requests.",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

// **************** post method to accept a signup request *************************

router.post("/accept/:id", authenticateToken, async (req, res) => {
  if (req.user.role.includes(1)) {
    try {
      // check for the request with given id
      const request = await Request.findById(req.params.id);
      //console.log(request);

      if (request) {
        // avoid duplicate users
        const userByEmail = await User.findOne({ email: request.email });
        if (userByEmail)
          return res.status(401).send({
            message: "Email already in use. Can't accept the request.",
          });

        const userByRegno = await User.findOne({ reg_no: request.reg_no });
        if (userByRegno)
          return res.status(401).send({
            message:
              "Registration Number already in use. Can't accept the request.",
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

          return res
            .status(200)
            .json({ message: "User registration successful!" });
        } catch (error) {
          return res.status(500).json({ message: "User registration failed" });
        }
      } else {
        return res.status(404).json({ message: "No Request Found!" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  res.send({
    message: "Unauthorized access. Only Admins can accept requests.",
  });
  return;
});

// **************** post method to reject a signup request *************************

router.post("/reject/:id", authenticateToken, async (req, res) => {
  if (req.user.role.includes(1)) {
    try {
      // check for the request with given id
      const request = await Request.findById(req.params.id);

      if (request) {
        try {
          // delete from Requests
          await Request.findByIdAndDelete(req.params.id);
          return res
            .status(200)
            .json({ message: "Request successfully rejected!" });
        } catch (error) {
          return res.status(500).json({ message: "Request rejection failed!" });
        }
      } else {
        return res.status(404).json({ message: "No Request Found!" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  res.send({
    message: "Unauthorized access. Only Admins can reject requests.",
  });
  return;
});

module.exports = router;
