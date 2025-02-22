const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../Controllers/WishlistController");

router.post("/add", addToWishlist);

router.get("/:userId", getWishlist);

router.post("/remove", removeFromWishlist);

module.exports = router;
