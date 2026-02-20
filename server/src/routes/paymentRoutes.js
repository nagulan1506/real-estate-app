import express from "express";
import * as paymentController from "../controllers/paymentController.js";

const router = express.Router();

router.post("/order", paymentController.createOrder);
router.post("/verify", paymentController.verifyPayment);

export default router;


