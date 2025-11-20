// controllers/workout.controller.js
import * as workoutService from "../services/workout.service.js";

export const createWorkoutController = async (req, res, next) => {
  try {
    const workoutData = req.body;

    // Validaciones básicas
    if (!workoutData.user_id) {
      return res.status(400).json({
        message: "Falta el campo user_id",
      });
    }

    if (!workoutData.routine_name || !workoutData.routine_type) {
      return res.status(400).json({
        message: "Faltan campos obligatorios: routine_name, routine_type",
      });
    }

    if (!workoutData.duration_seconds) {
      return res.status(400).json({
        message: "Faltan campos obligatorios: duration_seconds",
      });
    }

    if (!workoutData.exercises || workoutData.exercises.length === 0) {
      return res.status(400).json({
        message: "El workout debe tener al menos un ejercicio",
      });
    }

    const newWorkout = await workoutService.createWorkout(workoutData);

    res.status(201).json(newWorkout);
  } catch (error) {
    console.error("Error creating workout:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Error de validación",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    next(error);
  }
};

export const getWorkoutsForCalendarController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({
        message: "Se requieren los parámetros year y month",
      });
    }

    const calendarData = await workoutService.getWorkoutsForCalendar(
      userId,
      parseInt(year),
      parseInt(month)
    );

    res.status(200).json(calendarData);
  } catch (error) {
    next(error);
  }
};

export const getWorkoutStatsController = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const stats = await workoutService.getWorkoutStats(userId);

    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};
