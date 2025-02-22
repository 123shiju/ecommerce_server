const Order = require("../Models/OrderModel");
const User = require("../Models/UserModel");
const Cart = require("../Models/CartModel");

exports.placeOrder = async (req, res) => {
  const { userId, cart, paymentMethod } = req.body;

  try {
    const newOrder = new Order({
      userId,
      products: cart.products,
      totalAmount: cart.cartTotal,
      paymentMethod,
    });

    const savedOrder = await newOrder.save();

    await User.findByIdAndUpdate(userId, {
      $push: { orders: savedOrder._id },
    });

    await Cart.updateOne({ userId }, { $set: { products: [], cartTotal: 0 } });

    res.status(201).json({
      message: "Order placed successfully!",
      orderId: savedOrder._id,
      order: savedOrder,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to place order. Try again later." });
  }
};

exports.getOrderHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("orders");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      orders: user.orders,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to fetch orders. Try again later." });
  }
};

exports.getOrderDetails = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate("products.productId");
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json({
      order,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to fetch order details. Try again later." });
  }
};
