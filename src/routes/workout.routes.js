// routes/workout.routes.js
import express from "express";
import {
  createWorkoutController,
  getWorkoutsForCalendarController,
  getWorkoutStatsController,
} from "../controllers/workout.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(verifyToken);

// Crear workout
router.post("/", createWorkoutController);

// Obtener workouts para calendario
router.get("/calendar/month", getWorkoutsForCalendarController);

// Obtener estadísticas
router.get("/stats/summary", getWorkoutStatsController);

export default router;
