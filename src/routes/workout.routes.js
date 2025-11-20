import express from "express";
import {
  createWorkoutController,
  getWorkoutsForCalendarController,
  getWorkoutStatsController,
} from "../controllers/workout.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(verifyToken);

//POST / - Crear workout
router.post("/", createWorkoutController);

// GET /calendar/month -  Obtener workouts para calendario
router.get("/calendar/month", getWorkoutsForCalendarController);

// GET /stats/summary - Obtener estadísticas
router.get("/stats/summary", getWorkoutStatsController);

export default router;
