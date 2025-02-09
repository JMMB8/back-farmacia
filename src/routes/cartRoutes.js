const express = require("express");
const {
  addToCart,
  getCart,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cartController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/cart", authMiddleware, getCart);
router.post("/cart", authMiddleware, addToCart);
router.put("/cart:id", authMiddleware, updateCartItem);
router.delete("/cart:id", authMiddleware, deleteCartItem);

module.exports = router;
