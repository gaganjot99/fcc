require("dotenv").config();
const mongoose = require("mongoose");

const libSchema = mongoose.Schema({
  title: String,
  comments: [{ type: String }],
});

const libData = mongoose.model("libData", libSchema, "library");

const startDb = () => {
  return mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("connected to Database");
    })
    .catch((err) => console.log("Error happened during connecting to DB"));
};

module.exports = { libData, startDb };
