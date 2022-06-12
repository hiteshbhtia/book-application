const Book = require("../models/books");
const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
router.post("/addbook", async (req, res) => {
  try {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      // stock: req.body.stock,
      price: req.body.price,
      description: req.body.description,
    });
    const onebook = await book.save();
    res.json({ onebook, status: "ok" });
  } catch (err) {
    res.json({ status: "error", desc: "couldnt add book to db" });
  }
});

router.get("/home", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.json({ status: "error" });
  }
});
router.get("/home/:id", async (req, res) => {
  try {
    const books = await Book.findById(req.params.id);
    res.json(books);
    if (!books) {
      res.json({ success: false });
    }
  } catch (err) {
    process.on("uncaughtException", function (err) {
      console.error(err);
      console.log("Node NOT Exiting...");
      // res.send("error");
    });
    // res.json({ status: "error" });
  }
});
router.get("/editproduct", async (req, res) => {
  try {
    const book = await Book.find();
    res.json(book);
  } catch (err) {
    res.json({ status: "error" });
  }
});
// router.patch("/editproduct/:id", async (req, res) => {
//     try {
//         const book = await ;
//   } catch (err) {
//     res.json({ status: "error" });
//   }
// });
// router.post("/addbook", async (req, res) => {
//   try {
//     const book = await new Book({
//       title: req.body.title,
//       author: req.body.author,
//       price: req.body.price,
//       stock: req.body.stock,
//       description: req.body.description,
//     });
//     const onebook = await book.save();

//     res.json({ status: "ok",data: "Book added successfully"
//    });
//   } catch (err) {
//     res.json({ status: "error" });
//   }
// });

router.delete("/deletebook/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    const onebook = await book.delete();
    res.json({ status: "ok", book: onebook });
  } catch (err) {
    res.json({ status: "error", error: err });
  }
});

router.patch("/updatebook/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (req.body.title != null) {
      book.title = req.body.title;
    }
    if (req.body.author != null) {
      book.author = req.body.author;
    }
    if (req.body.description != null) {
      book.description = req.body.description;
    }

    if (req.body.price != null) {
      book.price = req.body.price;
    }
    const a = await book.save();
    console.log("Data Saved..!!!");
    res.json({ book });
  } catch (err) {
    res.json({ status: "error" });
    console.log(err);
  }
});

module.exports = router;
