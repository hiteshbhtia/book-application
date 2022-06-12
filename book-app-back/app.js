const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost/bookapp", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const con = mongoose.connection;
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const cartRouter = require("./routes/cart");

app.use("/api", userRouter);
app.use("/api", bookRouter);
app.use("/api", cartRouter);

con.on("open", () => {
  console.log("connection established");
});
app.listen(2000, () => {
  console.log("server listening on 2000");
});
