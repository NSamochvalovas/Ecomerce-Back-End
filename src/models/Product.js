const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    categories: {type: Array},
    size: {type: Array},
    price: {type: Number},
    inStock:{type: Boolean, default: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);