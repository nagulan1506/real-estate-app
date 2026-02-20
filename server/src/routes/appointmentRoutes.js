import express from "express";
import * as appointmentController from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/", appointmentController.createAppointment);

export default router;

