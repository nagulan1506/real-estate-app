import express from "express";
import * as adminController from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/summary", authMiddleware("admin"), adminController.getSummary);

export default router;

