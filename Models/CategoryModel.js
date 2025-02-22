const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Category name is required"],
    unique: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
