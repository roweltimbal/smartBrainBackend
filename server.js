const express = require("express");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/singin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

// const db = knex({
//   client: "pg",
//   connection: {
//     host: "127.0.0.1",
//     port: 5432,
//     user: "postgres",
//     password: "postGre",
//     database: "smart-brain",
//   },
// });

const db = knex({
  client: "pg",
  connection: {
    host: "dpg-crb474l6l47c73d2fv3g-a",
    port: 5432,
    user: "rowel",
    password: "rDK7CZWz0EgExQaTIir7KtnOwUWZrUhK",
    database: "smart_brain_8arm",
  },
});

// Parsing Json
app.use(express.json());

// CORS
app.use(cors());

// /(root route)
app.get("/", (req, res) => {
  res.send("It is working");
});

// /signin
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

// /register
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

// Get request profile and userId
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

// Put request to image
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

// Post request to image
app.post("/imageUrl", (req, res) => {
  image.handleApiCall(req, res, req.body.input);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
