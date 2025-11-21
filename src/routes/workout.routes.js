import express from "express";
import {
  createWorkoutController,
  getRecentWorkoutsController,
  getWorkoutsForCalendarController,
} from "../controllers/workout.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(verifyToken);

//POST /workouts - Crear workout
router.post("/", createWorkoutController);

// GET /workouts/recent - Obtener rutinas realizadas recientemente
router.get("/recent", getRecentWorkoutsController);

// GET /workouts/calendar/month -  Obtener workouts para calendario
router.get("/calendar/month", getWorkoutsForCalendarController);

export default router;
