const express = require("express");
const {
  addToCart,
  removeFromCart,
  getCart,
  updateQuantity,
} = require("../Controllers/CartController");
const router = express.Router();

router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.get("/:userId", getCart);
router.post("/update", updateQuantity);

module.exports = router;
