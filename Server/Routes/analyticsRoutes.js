
import express from "express";
import { getUsersByLocation } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/users-by-location", getUsersByLocation);

export default router;
