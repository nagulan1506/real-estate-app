import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

// Add logging middleware for debugging
router.use((req, res, next) => {
  console.log(`[Auth Route] ${req.method} ${req.path}`);
  next();
});

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

export default router;

