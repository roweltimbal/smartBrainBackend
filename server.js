const express = require("express");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/singin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "postGre",
    database: "smart-brain",
  },
});

// Parsing Json
app.use(express.json());

// CORS
app.use(cors());

// /(root route)
app.get("/", (req, res) => {
  res.send(database.users);
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

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
