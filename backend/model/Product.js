const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: [
    {
      type: String,
      required: true,
      enum: ["Men's", "Women's", "Kids", "Jeans", "Sarees", "Summer", "Winter"],
    },
  ],
  imageUrl: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
