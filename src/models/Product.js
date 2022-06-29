const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: Boolean, required: true},
    categories: {type: Array},
    size: {type: String},
    price: {type: Number},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);