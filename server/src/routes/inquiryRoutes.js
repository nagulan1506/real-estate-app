import express from "express";
import * as inquiryController from "../controllers/inquiryController.js";

const router = express.Router();

router.post("/", inquiryController.createInquiry);

export default router;


