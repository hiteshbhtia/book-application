const mongoose = require("mongoose");
const User = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  purcharses: {
    type: Array,
    default: [],
  },
});
const model = mongoose.model("User", User);
module.exports = model;
