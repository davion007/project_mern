require("dotenv").config;
const asyncHandler = require("express-async-handler");
const axios = require("axios");

const Product = require("../model/Product");

exports.createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, category, rating } = req.body;
  const image = req.file;
  let imageUrl;

  if (image) {
    const body = {
      image: image.buffer.toString("base64"), // Convert the file buffer to a base64-encoded string
      type: "base64",
    };

    const headers = {
      Authorization: `Client-ID ${process.env.IMGUR_ID}`,
    };

    try {
      const res = await axios.post("https://api.imgur.com/3/image", body, {
        headers,
      });
      imageUrl = res.data.data.link;
    } catch (error) {
      return res.status(501).json({ message: "File Upload Error" });
    }
  }

  const newProduct = new Product({
    title: title,
    description: description,
    price: price,
    category: category,
    imageUrl: imageUrl,
    rating: rating,
  });
  newProduct.save();
  res.status(200).json(newProduct);
});

exports.getAllProducts = asyncHandler(async (req, res) => {
  // Check if category and search term are provided in the query parameters
  const { category, searchTerm } = req.query;
  let products;

  if (category && searchTerm) {
    // Filter products by category and search term
    products = await Product.find({
      category: category,
      title: { $regex: searchTerm, $options: "i" },
    });
  } else if (category) {
    // Filter products by category
    products = await Product.find({
      category: { $regex: category, $options: "i" },
    });
  } else if (searchTerm) {
    // Filter products by search term
    products = await Product.find({
      title: { $regex: searchTerm, $options: "i" },
    });
  } else {
    // Get all products
    products = await Product.find();
  }

  res.status(200).json(products);
});

exports.getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json(product);
});
