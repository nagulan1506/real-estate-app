import express from "express";
import * as agentController from "../controllers/agentController.js";

const router = express.Router();

router.get("/", agentController.getAgents);
router.get("/:id", agentController.getAgentById);

export default router;


