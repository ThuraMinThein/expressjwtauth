const mongoose = require("mongoose");
const User = require("../models/User");

const handleErros = (err) => {
  let errors = { email: "", password: "" };

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
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErros(err);
    res.status(400).json(errors);
  }
};

module.exports.loginPost = (req, res) => {
  res.sendStatus(200);
};
