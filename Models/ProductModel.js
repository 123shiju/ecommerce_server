const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
    },
    variants: [
      {
        ram: { type: String },
        price: { type: Number },
        quantity: { type: Number },
      },
    ],
    category: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    brandName: {
      type: String,
    },
    partNumber: {
      type: String,
    },
    images: [{ type: String, required: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
