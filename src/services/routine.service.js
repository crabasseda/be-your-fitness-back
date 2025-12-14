import mongoose from "mongoose";
import { Routine } from "../models/routine.model.js";
import { User } from "../models/user.model.js";

export async function getAllRoutines(userId = null) {
  const query = userId ? { created_by: userId } : {};

  const routines = await Routine.find(query)
    .select("name type exercises createdAt assigned_athletes")
    .lean();

  return routines;
}

export async function getRoutineById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  const routine = await Routine.findById(id).lean();

  if (!routine) {
    throw new Error("Rutina no encontrada");
  }

  return routine;
}

export async function postRoutine(routineData) {
  const newRoutine = new Routine(routineData);
  await newRoutine.save();
  return newRoutine.toObject();
}

export async function updateRoutine(id, routineData) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  const routine = await Routine.findByIdAndUpdate(id, routineData, {
    new: true,
    runValidators: true,
  }).lean();

  if (!routine) {
    throw new Error("Rutina no encontrada");
  }

  return routine;
}

export async function deleteRoutine(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  const routine = await Routine.findByIdAndDelete(id);

  if (!routine) {
    throw new Error("Rutina no encontrada");
  }

  return { message: "Rutina eliminada correctamente" };
}

export async function assignRoutineToAthletes(
  routineId,
  athleteIds,
  trainerId
) {
  if (!mongoose.Types.ObjectId.isValid(routineId)) {
    throw new Error("ID de rutina no válido");
  }

  const routine = await Routine.findOne({
    _id: routineId,
    created_by: trainerId,
  });

  if (!routine) {
    throw new Error("Rutina no encontrada o no tienes permisos");
  }

  const validAthletes = await User.find({
    _id: { $in: athleteIds },
    role: "athlete",
    trainer_id: trainerId,
  });

  if (validAthletes.length !== athleteIds.length) {
    throw new Error("Algunos atletas no son válidos o no te pertenecen");
  }

  routine.assigned_athletes = athleteIds;
  await routine.save();

  return { message: "Rutina asignada correctamente" };
}

export async function getAssignedRoutines(athleteId) {
  const routines = await Routine.find({
    assigned_athletes: athleteId,
  })
    .select("name type exercises createdAt assigned_athletes")
    .lean();

  return routines;
}
