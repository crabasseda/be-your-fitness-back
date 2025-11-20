// controller/routineAssignment.controller.js
import * as assignmentService from "../services/routineAssignment.service.js";

// POST /assignments - Asignar a uno o múltiples atletas
export const assignRoutineController = async (req, res, next) => {
  try {
    const assignmentData = req.body;

    // Validar que tenga athlete_id O athlete_ids
    const hasAthleteId = assignmentData.athlete_id;
    const hasAthleteIds =
      assignmentData.athlete_ids && Array.isArray(assignmentData.athlete_ids);

    if (!hasAthleteId && !hasAthleteIds) {
      return res.status(400).json({
        message: "Debe proporcionar athlete_id o athlete_ids",
      });
    }

    if (
      !assignmentData.routine_id ||
      !assignmentData.assigned_by ||
      !assignmentData.scheduled_dates
    ) {
      return res.status(400).json({
        message:
          "Faltan campos obligatorios: routine_id, assigned_by, scheduled_dates",
      });
    }

    const result = await assignmentService.assignRoutine(assignmentData);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// GET /assignments/athlete/:athleteId - Todas las rutinas del atleta
export const getRoutinesByAthleteController = async (req, res, next) => {
  try {
    const { athleteId } = req.params;
    const routines = await assignmentService.getRoutinesByAthlete(athleteId);
    res.status(200).json(routines);
  } catch (error) {
    next(error);
  }
};

// GET /assignments/athlete/:athleteId/calendar/:year/:month - Calendario mensual
export const getMonthlyCalendarController = async (req, res, next) => {
  try {
    const { athleteId, year, month } = req.params;
    const calendar = await assignmentService.getMonthlyCalendar(
      athleteId,
      parseInt(year),
      parseInt(month)
    );
    res.status(200).json(calendar);
  } catch (error) {
    next(error);
  }
};
