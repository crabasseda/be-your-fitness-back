// routes/routineAssignment.routes.js
import express from "express";
import {
  assignRoutineController,
  getMonthlyCalendarController,
  getRoutinesByAthleteController,
} from "../controllers/routineAssignment.controller.js";

const router = express.Router();

// POST /assignments - Asignar rutina (uno o múltiples atletas)
router.post("/", assignRoutineController);

// GET /assignments/athlete/:athleteId - Todas las rutinas del atleta
router.get("/athlete/:athleteId", getRoutinesByAthleteController);

// GET /assignments/athlete/:athleteId/calendar/:year/:month - Calendario mensual
router.get(
  "/athlete/:athleteId/calendar/:year/:month",
  getMonthlyCalendarController
);

export default router;
