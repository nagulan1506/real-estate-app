import express from "express";
import * as propertyController from "../controllers/propertyController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", propertyController.getProperties);
router.get("/:id", propertyController.getPropertyById);
router.post("/", authMiddleware("agent"), propertyController.createProperty);
router.patch("/:id", authMiddleware("agent"), propertyController.updateProperty);
router.delete("/:id", authMiddleware("agent"), propertyController.deleteProperty);

export default router;


