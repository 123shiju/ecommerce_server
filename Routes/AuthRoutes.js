const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../Controllers/UserController");

const { verifyToken } = require("../Middlewares/UserAuth");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
