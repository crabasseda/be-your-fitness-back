import * as workoutService from "../services/workout.service.js";

export const createWorkoutController = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.body.user_id;

    const workoutData = {
      ...req.body,
      user_id: userId,
    };

    const newWorkout = await workoutService.createWorkout(workoutData);
    res.status(201).json(newWorkout);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Error de validación",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    next(error);
  }
};

export const getRecentWorkoutsController = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.body.user_id;
    const limit = parseInt(req.query.limit) || 10;

    const recentWorkouts = await workoutService.getRecentWorkouts(
      userId,
      limit
    );
    res.status(200).json(recentWorkouts);
  } catch (error) {
    next(error);
  }
};

export const getWorkoutsForCalendarController = async (req, res, next) => {
  try {
    const userId = req.user.id;
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
