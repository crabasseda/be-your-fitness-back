// services/workout.service.js
import { Workout } from "../models/workout.model.js";

/**
 * Crea un nuevo workout completado
 */
export async function createWorkout(workoutData) {
  const workout = new Workout({
    user_id: workoutData.user_id,
    routine_id: workoutData.routine_id,
    routine_name: workoutData.routine_name,
    routine_type: workoutData.routine_type,
    started_at: workoutData.started_at,
    finished_at: workoutData.finished_at,
    duration_seconds: workoutData.duration_seconds,
    exercises: workoutData.exercises,
    notes: workoutData.notes || "",
  });

  await workout.save();
  return workout.toObject();
}

/**
 * Obtiene workouts para un mes específico (para el calendario)
 */
export async function getWorkoutsForCalendar(userId, year, month) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);

  const workouts = await Workout.find({
    user_id: userId,
    started_at: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .sort({ started_at: 1 })
    .lean();

  // Agrupar por día
  const calendarData = {};

  workouts.forEach((workout) => {
    const day = new Date(workout.started_at).getDate();

    if (!calendarData[day]) {
      calendarData[day] = {
        count: 0,
        total_duration: 0,
        workouts: [],
      };
    }

    calendarData[day].count++;
    calendarData[day].total_duration += workout.duration_seconds;
    calendarData[day].workouts.push({
      _id: workout._id,
      routine_name: workout.routine_name,
      routine_type: workout.routine_type,
      duration_seconds: workout.duration_seconds,
      started_at: workout.started_at,
    });
  });

  return calendarData;
}

/**
 * Obtiene estadísticas básicas del usuario
 */
export async function getWorkoutStats(userId) {
  const now = new Date();

  // Total de workouts
  const totalWorkouts = await Workout.countDocuments({ user_id: userId });

  // Workouts esta semana
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Domingo
  startOfWeek.setHours(0, 0, 0, 0);

  const workoutsThisWeek = await Workout.countDocuments({
    user_id: userId,
    started_at: { $gte: startOfWeek },
  });

  // Workouts este mes
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const workoutsThisMonth = await Workout.countDocuments({
    user_id: userId,
    started_at: { $gte: startOfMonth },
  });

  // Duración total
  const durationResult = await Workout.aggregate([
    { $match: { user_id: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        total_duration: { $sum: "$duration_seconds" },
      },
    },
  ]);

  const totalDurationSeconds = durationResult[0]?.total_duration || 0;
  const totalDurationHours = (totalDurationSeconds / 3600).toFixed(1);

  // Rutina más usada
  const mostUsedRoutine = await Workout.aggregate([
    { $match: { user_id: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: "$routine_name", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ]);

  // Tipo más entrenado
  const mostTrainedType = await Workout.aggregate([
    { $match: { user_id: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: "$routine_type", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ]);

  return {
    total_workouts: totalWorkouts,
    workouts_this_week: workoutsThisWeek,
    workouts_this_month: workoutsThisMonth,
    total_duration_hours: parseFloat(totalDurationHours),
    favorite_routine: mostUsedRoutine[0]?._id || null,
    most_trained_type: mostTrainedType[0]?._id || null,
  };
}
