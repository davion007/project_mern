const express = require("express");
const Router = express.Router();
const multer = require("multer");
const upload = multer();
const {
  createProduct,
  getSingleProduct,
  getAllProducts,
} = require("../controller/product-controller");

Router.post("/create", upload.single("image"), createProduct);
Router.get("/:id", getSingleProduct);
Router.get("/", getAllProducts);

module.exports = Router;
