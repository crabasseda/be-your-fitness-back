import mongoose from "mongoose";
import { Routine } from "../models/routine.model.js";

export async function getAllRoutines(userId = null) {
  const query = userId ? { created_by: userId } : {};

  const routines = await Routine.find(query)
    .select("name type exercises createdAt")
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
