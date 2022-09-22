const express = require("express");
const router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "Simranisagoodgirl";
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const User = require("../models/User");

// ROUTE 1: Creating a user using :POST "/api/auth/create-user"
router.post(
  "/create-user",
  body("name", "Enter the valid name").isLength({ min: 3 }),
  body("email", "Enter the valid email").isEmail(),
  // password must be at least 5 chars long
  body("password", "Password must be of 5 characters").isLength({ min: 5 }),
  async (req, res) => {
    let success=false;
    // const user=new User(req.body)
    // user.save();
    // res.send(req.body)
    try {
      // if there are errors return bad request and the error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
      }
      // Checking if the user is already present
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(500)
          .json({ success,error: "Sorry a user with this mail id already exists" });
      }
      // creating salt of 10 characters
      var salt = await bcrypt.genSaltSync(10);
      //
      // adding salt to the hash
      // Creating hash and not adding the password directly into the database
      var secPass = await bcrypt.hashSync(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // we are using async so no need of then and catch
      // .then(user => res.json(user))
      // .catch(err=>{
      //     console.log(err);
      //     res.json({error:"Please enter unique value for email",
      //         message:err.message
      //     })
      // })
      // creating the data part
      const data = {
        user: {
          id: user.id,
        },
      };
      // jwt sign function which takes 2 arguments one is data part and other is the secret key which help to verify the user
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success,authToken });
      // Will catch all the error if any
    } catch (error) {
      res.status(500).send({ error: "Some error occured" });
      // res.json(user)
    }
  }
);

// ROUTE 2: Authenticating a user using :POST "/api/auth/login"

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Get logged in user details a user using :POST "/api/auth/get-user"
router.post("/get-user", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Some error occured" });
  }
});
module.exports = router;
