const express = require("express");
const {Router} = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = Router();
router.post("/usuarios", registerUser);
router.post("/login", loginUser);
router.get("/usuarios", authMiddleware, getUserProfile);

module.exports = router;
