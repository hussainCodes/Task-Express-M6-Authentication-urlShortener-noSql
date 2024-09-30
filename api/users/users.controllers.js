const User = require("../../models/User");
const bcrypt = require('bcrypt');
const { name } = require("ejs");
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const cryptPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

const generateToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name
  }

  const token = jwt.sign(payload, process.env.JWT_SECRETKEY, {expiresIn: "1h"});
  return token;
}

exports.signup = async (req, res) => {
  try {
    const securePassword = await cryptPassword(req.body.password);
    req.body.password = securePassword;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({token: token});
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};


