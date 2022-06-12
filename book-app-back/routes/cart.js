const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const Book = require("../models/books");
const getUser = require("../middleware/getuser");
router.post("/cart/:id", getUser, async (req, res) => {
  const { price, stock, title, description } = req.body;
  try {
    const id = req.params.id;

    const AddToCart = await new Cart({
      title,
      description,
      stock,
      price,
      user: req.user.id,
      book: req.params.id,
    });

    const savedBook = await AddToCart.save();
    res.json({ savedBook, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send("some error occured");
  }
});

router.put("/bookcart/:id", getUser, async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, stock, price } = req.body;
    const newnote = {};
    newnote.title = title;
    newnote.description = description;
    newnote.stock = stock;
    newnote.price = price;
    const userBooks = await Cart.findOneAndUpdate(
      { book: id, _id: req.body.cartid },
      { $set: newnote },
      { new: true }
    );
    res.json({ userBooks });
  } catch (err) {
    res.json({ err });
    console.log(err);
  }
});

router.get("/bookcart", getUser, async (req, res) => {
  try {
    const id = req.user.id;

    const userBooks = await Cart.find({ user: id });
    // console.log(userBooks);
    res.json({ userBooks });
  } catch (err) {
    console.log(err);
    res.status(500).send("some error occured");
  }
});
router.delete("/bookcart/:id", getUser, async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Cart.findById(id);
    const a1 = await book.delete();

    res.json({ book });
    console.log(a1);
  } catch (err) {
    res.json({ err });
    console.log(err);
  }
});

module.exports = router;
