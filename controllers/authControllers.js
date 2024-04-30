const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleErros = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "incorrect email") {
    errors.email = `that email hasn't registered yet`;
  }

  if (err.message === "incorrect password") {
    errors.password = "that password is incorrect";
  }

  //duplicate error
  if (err.code === 11000) {
    errors.email = "this email has already used";
    return errors;
  }

  //validate error
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 60 * 60 * 24 * 3;
const createToken = (id) => {
  return jwt.sign({ id }, "thuraminthein secret", {
    expiresIn: maxAge,
  });
};

module.exports.signUpGet = (req, res) => {
  res.render("signup");
};

module.exports.loginGet = (req, res) => {
  res.render("login");
};

module.exports.signUpPost = async (req, res) => {
  const { body } = req;
  try {
    const user = await User.create({ ...body });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErros(err);
    res.status(400).json({ errors });
  }
};

module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    return res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErros(err);
    return res.status(400).json({ errors });
  }
};

module.exports.logoutGet = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
