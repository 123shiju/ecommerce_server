const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../Controllers/WishlistController");
const { verifyToken } = require("../Middlewares/UserAuth");

router.post("/add", verifyToken, addToWishlist);

router.get("/:userId", verifyToken, getWishlist);

router.post("/remove", verifyToken, removeFromWishlist);

module.exports = router;
