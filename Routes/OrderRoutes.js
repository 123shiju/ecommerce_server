const express = require("express");
const {
  placeOrder,
  getOrderHistory,
  getOrderDetails,
} = require("../Controllers/OrderController");
const router = express.Router();

router.post("/placeOrder", placeOrder);

router.get("/history/:userId", getOrderHistory);

router.get("/:orderId", getOrderDetails);

module.exports = router;
