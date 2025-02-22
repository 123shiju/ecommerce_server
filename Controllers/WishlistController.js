const Wishlist = require("../Models/WishlistModel");
const Product = require("../Models/ProductModel");

exports.addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Check if the wishlist already exists for this user
    let wishlist = await Wishlist.findOne({ userId });
    if (wishlist) {
      // Check if the product is already in the wishlist
      const exists = wishlist.products.some(
        (p) => p.productId.toString() === productId
      );
      if (exists) {
        return res
          .status(200)
          .json({ message: "Product is already in wishlist.", wishlist });
      }
    }

    // Add product to wishlist using $addToSet to prevent duplicates
    wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $addToSet: { products: { productId } } },
      { new: true, upsert: true }
    );

    return res
      .status(200)
      .json({ message: "Product added to wishlist.", wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId }).populate(
      "products.productId"
    );

    if (!wishlist || wishlist.products.length === 0) {
      return res.status(404).json({ message: "Wishlist is empty." });
    }

    res.status(200).json({ wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true }
    );

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found." });
    }

    res
      .status(200)
      .json({ message: "Product removed from wishlist.", wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
