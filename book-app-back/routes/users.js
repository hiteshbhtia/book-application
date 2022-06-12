const express = require("express");
const User = require("../models/user");
const Book = require("../models/books");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const getUser = require("../middleware/getuser");

router.post(
  "/register",
  body("firstname", "enter the valid name").isLength({ min: 3 }),

  // username must be an email
  body("email", "enter the valid email").isEmail(),
  // password must be at least 5 chars long
  body("password", "password mustbe atleast 5 characters").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secureHash = await bcrypt.hash(req.body.password, salt);

      user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: secureHash,
        email: req.body.email,
      });
      const oneuser = await user.save();

      const data = {
        user: {
          id: user.id,
        },
      };
      const jwt_secret = "abcdefg";
      const authtoken = jwt.sign(data, jwt_secret);
      console.log(authtoken);
      res.json({ authtoken, status: "ok", oneuser });
      // res.json({ oneuser, status: "ok" });
    } catch (err) {
      console.log(error);
      res.status(500).send("some error occured");
    }
  }
);

router.post(
  "/login",
  // username must be an email
  body("email", "enter the valid email").isEmail(),
  // password must be at least 5 chars long
  body("password", "password cannot be blank").exists(),
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        email,
      });
      if (!user) {
        return res
          .status(400)
          .json({
            status: "error",
            message: "please try to login with correct credentials",
          });
      }
      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        return res
          .status(400)
          .json({
            status: "error",
            message: "please try to login with correct credentials",
          });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwt_secret = "abcdefg";
      const authtoken = jwt.sign(data, jwt_secret);
      console.log(authtoken);
      res.json({ status: "ok", authtoken });
    } catch (err) {
      res.json({ error: "error" });
    }
  }
);

router.post("/getuser", getUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
  }
});

router.get("/allusers", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ status: "error" });
  }
});

module.exports = router;
