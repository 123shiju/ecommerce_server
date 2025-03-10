const Wishlist = require("../Models/WishlistModel");
const Product = require("../Models/ProductModel");

exports.addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    let wishlist = await Wishlist.findOne({ userId });
    if (wishlist) {
      const exists = wishlist.products.some(
        (p) => p.productId.toString() === productId
      );
      if (exists) {
        return res
          .status(200)
          .json({ message: "Product is already in wishlist.", wishlist });
      }
    }

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
    const wishlist = await Wishlist.findOne({ userId }).populate({
      path: "products.productId",
      model: "Product",
      select: "title images price description",
    });

    if (!wishlist || wishlist.products.length === 0) {
      return res.status(404).json({ message: "Wishlist is empty." });
    }

    res.status(200).json({ wishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
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
