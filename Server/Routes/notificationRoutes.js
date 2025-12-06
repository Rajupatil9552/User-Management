// src/routes/notificationRoutes.js
import express from "express";
import { notifyUser } from "../controllers/notificationController.js";

const router = express.Router();

router.post("/:id", notifyUser);

export default router;
