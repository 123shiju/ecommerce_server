const Cart = require("../Models/CartModel");
const Product = require("../Models/ProductModel");

// Add to Cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [], cartTotal: 0 });
    }

    const existingProduct = cart.products.find(
      (item) => item.productId.toString() === productId
    );

    const price = Number(product.variants?.[0]?.price) || 0;
    if (!price)
      return res.status(400).json({ message: "Invalid product price" });

    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.total = existingProduct.quantity * price;
    } else {
      cart.products.push({
        productId,
        name: product.title,
        image: product.images?.[0] || "",
        price,
        quantity: 1,
        total: price,
      });
    }

    cart.cartTotal = cart.products.reduce(
      (sum, item) => sum + (item.total || 0),
      0
    );
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove Product from Cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );
    cart.cartTotal = cart.products.reduce(
      (sum, item) => sum + (item.total || 0),
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    res.status(200).json({
      userId,
      cart: cart || { products: [] },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { userId, productId, action } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product)
      return res.status(404).json({ message: "Product not in cart" });

    if (action === "increase") {
      product.quantity += 1;
    } else if (action === "decrease") {
      product.quantity -= 1;
      if (product.quantity <= 0) {
        cart.products = cart.products.filter(
          (item) => item.productId.toString() !== productId
        );
      }
    }

    product.total = product.quantity * product.price;
    cart.cartTotal = cart.products.reduce(
      (sum, item) => sum + (item.total || 0),
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
