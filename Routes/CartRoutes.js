const express = require("express");
const {
  addToCart,
  removeFromCart,
  getCart,
  updateQuantity,
} = require("../Controllers/CartController");
const router = express.Router();
const { verifyToken } = require("../Middlewares/UserAuth");

router.post("/add", verifyToken, addToCart);
router.post("/remove", verifyToken, removeFromCart);
router.get("/:userId", verifyToken, getCart);
router.post("/update", verifyToken, updateQuantity);

module.exports = router;
