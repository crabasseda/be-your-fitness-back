// services/routine.service.js
import mongoose from "mongoose";
import { Routine } from "../models/routine.model.js";

// GET todas las rutinas (para mostrar cards)
export async function getAllRoutines(userId = null) {
  const query = userId ? { created_by: userId } : {};

  const routines = await Routine.find(query)
    .select("name type exercises created_at")
    .lean();

  if (!routines || routines.length === 0) {
    throw new Error("No se encontraron rutinas");
  }

  return routines;
}

// GET rutina por ID (detalle completo)
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

// POST nueva rutina
export async function postRoutine(routineData) {
  if (!routineData.exercises || routineData.exercises.length === 0) {
    throw new Error("La rutina debe tener al menos un ejercicio");
  }

  routineData.exercises.forEach((exercise, index) => {
    if (!exercise.sets || exercise.sets.length === 0) {
      throw new Error(
        `El ejercicio en posición ${index + 1} debe tener al menos un set`
      );
    }
  });
  console.log(
    "📥 Datos recibidos en postRoutine:",
    JSON.stringify(routineData, null, 2)
  );

  const newRoutine = new Routine({
    name: routineData.name,
    type: routineData.type,
    created_by: routineData.created_by,
    exercises: routineData.exercises,
    schedule: routineData.schedule,
  });

  console.log(
    "📝 Objeto antes de guardar:",
    JSON.stringify(newRoutine, null, 2)
  );

  await newRoutine.save();

  return newRoutine.toObject();
}

// PUT actualizar rutina completa
export async function updateRoutine(id, routineData) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  if (!routineData.exercises || routineData.exercises.length === 0) {
    throw new Error("La rutina debe tener al menos un ejercicio");
  }

  routineData.exercises.forEach((exercise, index) => {
    if (!exercise.sets || exercise.sets.length === 0) {
      throw new Error(
        `El ejercicio en posición ${index + 1} debe tener al menos un set`
      );
    }
  });

  const routine = await Routine.findByIdAndUpdate(
    id,
    {
      name: routineData.name,
      type: routineData.type,
      exercises: routineData.exercises,
    },
    { new: true, runValidators: true }
  ).lean();

  if (!routine) {
    throw new Error("Rutina no encontrada");
  }

  return routine;
}

// DELETE eliminar rutina
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
