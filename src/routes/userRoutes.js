const express = require("express");
const {Router} = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = Router();
router.post("/users", registerUser);
router.post("/login", loginUser);
router.get("/users", authMiddleware, getUserProfile);

module.exports = router;
