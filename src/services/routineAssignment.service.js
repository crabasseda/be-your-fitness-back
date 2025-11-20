// services/routineAssignment.service.js
import mongoose from "mongoose";
import { RoutineAssignment } from "../models/routineAssignment.model.js";

// 1. Asignar rutina (a uno o múltiples atletas)
export async function assignRoutine(assignmentData) {
  const {
    routine_id,
    athlete_id,
    athlete_ids,
    assigned_by,
    scheduled_dates,
    notes,
  } = assignmentData;

  // Si viene athlete_ids (array), asignar a múltiples
  if (athlete_ids && Array.isArray(athlete_ids) && athlete_ids.length > 0) {
    const assignments = athlete_ids.map((id) => ({
      routine_id,
      athlete_id: id,
      assigned_by,
      scheduled_dates,
      notes,
    }));

    const result = await RoutineAssignment.insertMany(assignments);

    return await RoutineAssignment.find({
      _id: { $in: result.map((r) => r._id) },
    })
      .populate("routine_id", "name type")
      .populate("athlete_id", "name email avatar")
      .populate("assigned_by", "name");
  }

  // Si viene athlete_id (uno solo)
  const assignment = new RoutineAssignment({
    routine_id,
    athlete_id,
    assigned_by,
    scheduled_dates,
    notes,
  });

  await assignment.save();

  return await RoutineAssignment.findById(assignment._id)
    .populate("routine_id", "name type")
    .populate("athlete_id", "name email avatar")
    .populate("assigned_by", "name");
}

// 2. Obtener todas las rutinas asignadas a un atleta
export async function getRoutinesByAthlete(athleteId) {
  if (!mongoose.Types.ObjectId.isValid(athleteId)) {
    throw new Error("ID de atleta inválido");
  }

  return await RoutineAssignment.find({
    athlete_id: athleteId,
    status: "active",
  })
    .populate("routine_id")
    .populate("assigned_by", "name")
    .sort({ assigned_date: -1 })
    .lean();
}

// 3. Calendario mensual de un atleta
export async function getMonthlyCalendar(athleteId, year, month) {
  if (!mongoose.Types.ObjectId.isValid(athleteId)) {
    throw new Error("ID de atleta inválido");
  }

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  const assignments = await RoutineAssignment.find({
    athlete_id: athleteId,
    status: "active",
    scheduled_dates: {
      $elemMatch: {
        $gte: startDate,
        $lte: endDate,
      },
    },
  })
    .populate("routine_id", "name type")
    .lean();

  const calendar = {};

  assignments.forEach((assignment) => {
    assignment.scheduled_dates.forEach((date) => {
      if (date >= startDate && date <= endDate) {
        const dateKey = date.toISOString().split("T")[0];

        if (!calendar[dateKey]) {
          calendar[dateKey] = [];
        }

        calendar[dateKey].push({
          assignment_id: assignment._id,
          routine: assignment.routine_id,
          notes: assignment.notes,
        });
      }
    });
  });

  return calendar;
}
