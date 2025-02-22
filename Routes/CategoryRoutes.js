const express = require("express");
const router = express.Router();
const {
  addCategory,
  getAllCategories,
} = require("../Controllers/CategoryController");

router.post("/Addcategories", addCategory);
router.get("/GetAll", getAllCategories);

module.exports = router;
