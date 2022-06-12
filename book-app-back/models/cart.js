const mongoose = require("mongoose");
const Cart = mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  stock: Number,
  title: String,
  description: String,
  price: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const model = mongoose.model("Cart", Cart);
module.exports = model;
