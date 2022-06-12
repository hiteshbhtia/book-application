const mongoose = require("mongoose");
const Book = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  // stock: {
  //   type: Number,
  //   required: true,
  // },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const model = mongoose.model("Book", Book);
module.exports = model;
