const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
const authRoutes = require("./Routes/AuthRoutes");
const ProductRoutes = require("./Routes/ProductRoutes");
const Category = require("./Routes/CategoryRoutes");
const wishlistRoutes = require("./Routes/WishListRoutes");
const cartRoutes = require("./Routes/CartRoutes");
const orderRoutes = require("./Routes/OrderRoutes");
const cors = require("cors");
const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const allowedOrigins = ['https://myecommercehub.netlify.app']; 

app.use(cors({
  origin: allowedOrigins,
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));


app.options('*', cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", ProductRoutes);
app.use("/api/category", Category);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/order", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
