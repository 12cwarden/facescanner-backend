const Clarifai = require("clarifai");
const { json } = require("express");

const app = new Clarifai.App({
  apiKey: "2d6eac47e1984bfe83e12e450deb98df",
});

const handleAPICall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  // let found = false;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
  // if (!found) {
  //   req.status(400).json("User not found.");
  // }
};

module.exports = {
  handleImage: handleImage,
  handleAPICall: handleAPICall,
};
