require("dotenv").config();
const asyncHandler = require("express-async-handler");
const Cart = require("../model/Cart");
const Product = require("../model/Product");

exports.getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const existingCart = await Cart.findOne({ userId: userId }).populate(
    "products.productId"
  );

  if (!existingCart) {
    const newCart = new Cart({
      userId: userId,
      products: [],
    });

    await newCart.save();
    return res.status(200).json({ cart: newCart });
  }

  return res.status(200).json({ cart: existingCart });
});

exports.addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  let existingCart = await Cart.findOne({ userId: userId }).populate(
    "products.productId"
  );

  if (!existingCart) {
    const newCart = new Cart({
      userId: userId,
      products: [{ productId, quantity }],
    });

    await newCart.save();
    existingCart = newCart;
  } else {
    const existingProductIndex = existingCart.products.findIndex(
      (product) => product.productId._id.toString() === productId
    );

    if (existingProductIndex !== -1) {
      existingCart.products[existingProductIndex].quantity += quantity;
    } else {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const newProduct = {
        productId: product,
        quantity: quantity,
      };

      existingCart.products.push(newProduct);
    }

    await existingCart.save();
    existingCart = await Cart.findOne({ _id: existingCart._id }).populate(
      "products.productId"
    );
  }

  const updatedProduct = existingCart.products.find(
    (product) => product.productId._id.toString() === productId
  );

  return res.status(200).json({ cart: existingCart, updatedProduct });
});

exports.decrementQuantity = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  let existingCart = await Cart.findOne({ userId: userId }).populate(
    "products.productId"
  );

  if (!existingCart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const existingProductIndex = existingCart.products.findIndex(
    (product) => product.productId._id.toString() === productId
  );

  if (existingProductIndex !== -1) {
    const existingProduct = existingCart.products[existingProductIndex];

    if (existingProduct.quantity > 1) {
      existingProduct.quantity -= quantity;
      await existingCart.save();
      return res
        .status(200)
        .json({ cart: existingCart, updatedProduct: existingProduct });
    } else {
      existingCart.products.splice(existingProductIndex, 1);
      await existingCart.save();
      return res
        .status(200)
        .json({ cart: existingCart, updatedProduct: existingProduct });
    }
  }

  return res.status(404).json({ message: "Product not found in the cart" });
});

exports.removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;

  const existingCart = await Cart.findOne({ userId: userId }).populate(
    "products.productId"
  );

  if (!existingCart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const existingProductIndex = existingCart.products.findIndex(
    (product) => product.productId._id.toString() === productId
  );

  if (existingProductIndex !== -1) {
    const removedProduct = existingCart.products.splice(
      existingProductIndex,
      1
    )[0];
    await existingCart.save();
    return res.status(200).json({ cart: existingCart, removedProduct });
  }

  return res.status(404).json({ message: "Product not found in the cart" });
});
