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
router.post("/remove", removeFromCart);
router.get("/:userId", getCart);
router.post("/update", updateQuantity);

module.exports = router;
