const express = require("express");
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
} = require("../Controllers/ProductController");

const { verifyToken } = require("../Middlewares/UserAuth");

const router = express.Router();

router.post("/add", addProduct);
router.get("/displayAll", getProducts);
router.get("/productDetails/:id", getProductById);
router.put("/EditProduct/:id", updateProduct);

module.exports = router;
