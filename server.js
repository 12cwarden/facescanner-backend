const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const { json } = require("express");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "postgresql-angular-19150",
    port: 5432,
    user: "postgres",
    password: "facescanner",
    database: "facescanner",
  },
});

// db.select("*")
//   .from("users")
//   .then((data) => {
//      console.log(data);
//   });

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/signin", (req, res) => {
  signin.handleSignIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleAPICall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});

// signin --> POST  = success or fail, POST for protected password.
// register --> POST = user
//profile/uID --> GET = user
//image --> PUT for user profile img
