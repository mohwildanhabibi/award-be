// MODULES
const bcrypt = require("bcryptjs");
const app = require("express").Router();
const jwt = require("jsonwebtoken");

const User = require("~/models/user");

app.post("/signup", async (req, res) => {
  const existUser = await User.findOne({ email: req.body.email });
  if (existUser) {
    res.status(409).json({ status: "error", message: "Email existed" });
  } else {
    bcrypt.genSalt(10, async function (err, salt) {
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        const newUser = await User.create({
          email: req.body.email,
          password: hash,
        });
        //Creating jwt token
        const token = jwt.sign(
          { _id: newUser._id, email: newUser.email },
          process.env.SECRET_TOKEN,
          {
            expiresIn: "1d",
          }
        );
        res.json({
          status: "OK",
          message: "User created",
          result: {
            _id: newUser._id,
            email: newUser.email,
            token: `Bearer ${token}`,
          },
        });
      });
    });
  }
});

app.post("/signin", async (req, res) => {
  const existUser = await User.findOne({ email: req.body.email });
  if (!existUser) {
    res.status(404).json({ status: "error", message: "User not found" });
  } else {
    bcrypt.compare(req.body.password, existUser.password).then((result) => {
      if (result === true) {
        //Creating jwt token
        const token = jwt.sign(
          { _id: existUser._id, email: existUser.email },
          process.env.SECRET_TOKEN,
          {
            expiresIn: "1d",
          }
        );
        res.json({
          status: "OK",
          result: {
            _id: existUser._id,
            email: existUser.email,
            token: `Bearer ${token}`,
          },
        });
      } else {
        res
          .status(401)
          .json({ status: "error", message: "Password not match" });
      }
    });
  }
});

module.exports = app;
