const express = require("express");
const Router = express.Router();
const { protect } = require("../middlewares/protect");

const {
  getUserCart,
  addToCart,
  removeFromCart,
  decrementQuantity
} = require("../controller/cart-controller");

Router.get("/", protect, getUserCart);
Router.put("/add", protect, addToCart);
Router.put("/decrease", protect, decrementQuantity);
Router.put("/remove", protect, removeFromCart);

module.exports = Router;
