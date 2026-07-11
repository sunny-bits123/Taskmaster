const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  register,
  login,
  getMe,
  forgotPassword,
} = require("../controllers/authController");

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/login
router.post("/login", login);

// GET /api/auth/me
router.get("/me", auth, getMe);

// POST /api/auth/forgot-password
router.post("/forgot-password", forgotPassword);

module.exports = router;