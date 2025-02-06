const express = require("express");
const { addToCart, getCart, updateCartItem, deleteCartItem } = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/", authMiddleware, addToCart);
router.put("/:id", authMiddleware, updateCartItem);
router.delete("/:id", authMiddleware, deleteCartItem);

module.exports = router;