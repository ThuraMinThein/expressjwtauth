const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.static("public"));
app.use(express.json());

// view engine
app.set("view engine", "ejs");

// database connection

const dbURI =
  "mongodb+srv://thura:thuraminthein@node-auth.a6biqwe.mongodb.net/node-jwt-auth";
mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(PORT, (req, res) => {
      console.log("server is running");
    })
  )
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRoutes);
