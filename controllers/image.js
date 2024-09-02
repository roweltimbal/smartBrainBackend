const { response } = require("express");

const PAT = process.env.CLARIFAI_PAT;
const MODEL_ID = "face-detection";
// const requestOptions = {
//   method: "POST",
//   headers: {
//     Accept: "application/json",
//     Authorization: "Key " + PAT,
//   },
//   body: raw,
// };

const handleApiCall = (req, res) => {
  const requestOptions = req.body.input;
  requestOptions.headers.Authorization = "Key " + PAT;
  console.log(requestOptions);
  fetch(
    "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.error("Error with Clarifai API: ", err);
      res.status(400).json("unable to work with API");
    });
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where({ id: id })
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.status(200).json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("Error loading entries."));
};

module.exports = {
  handleImage,
  handleApiCall,
};
