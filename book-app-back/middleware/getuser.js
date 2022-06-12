const jwt = require("jsonwebtoken");
const jwt_secret = "abcdefg";

const getUser = (req, res, next) => {
  const token = req.header("authtoken");
  if (!token) {
    res.status(401).send({ error: "please authenicate using valid token" });
  }
  try {
    const data = jwt.verify(token,jwt_secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenicate using valid token" });
  }
};
module.exports = getUser;
