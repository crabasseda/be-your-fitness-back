import { Workout } from "../models/workout.model.js";

export async function createWorkout(workoutData) {
  const newWorkout = new Workout(workoutData);
  await newWorkout.save();
  return newWorkout.toObject();
}

export async function getRecentWorkouts(
  userId,
  limit = 10,
  startDate = null,
  endDate = null
) {
  let query = { user_id: userId };
  if (startDate) {
    const end = endDate ? new Date(endDate) : new Date();

    query.createdAt = {
      $gte: new Date(startDate),
      $lte: end,
    };
  }

  const queryBuilder = Workout.find(query)
    .sort({ createdAt: -1 })
    .select(
      "routine_name routine_type duration_seconds exercises createdAt notes"
    );

  if (!startDate) {
    queryBuilder.limit(limit);
  }

  const workouts = await queryBuilder.lean();

  return workouts;
}

export async function getWorkoutsForCalendar(userId, year, month) {
  const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
  const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

  const workouts = await Workout.find({
    user_id: userId,
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .sort({ createdAt: 1 })
    .lean();

  const calendarData = {};
  workouts.forEach((workout) => {
    const day = new Date(workout.createdAt).getDate();
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
      started_at: workout.createdAt,
    });
  });

  return calendarData;
}
