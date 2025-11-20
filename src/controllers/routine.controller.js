// controller/routine.controller.js
import * as routineService from "../services/routine.service.js";

// GET /routines - Listar todas (cards)
export const getAllRoutinesController = async (req, res, next) => {
  try {
    const userId = req.query.userId || req.user?.id;
    const routines = await routineService.getAllRoutines(userId);
    res.status(200).json(routines);
  } catch (error) {
    next(error);
  }
};

// GET /routines/:id - Detalle completo (edición)
export const getRoutineByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const routine = await routineService.getRoutineById(id);
    res.status(200).json(routine);
  } catch (error) {
    next(error);
  }
};

// POST /routines - Crear rutina (con ejercicios obligatorios)

export const postRoutineController = async (req, res, next) => {
  try {
    console.log(
      "🎯 Body recibido en controlador:",
      JSON.stringify(req.body, null, 2)
    );
    const routineData = req.body;

    if (!routineData.name || !routineData.type) {
      return res.status(400).json({
        message: "Faltan campos obligatorios: name, type",
      });
    }

    if (!routineData.exercises || routineData.exercises.length === 0) {
      return res.status(400).json({
        message: "La rutina debe tener al menos un ejercicio",
      });
    }
    const userId = req.query.userId || req.user?.id;
    routineData.created_by = userId;

    console.log("✅ routineData con created_by:", routineData);

    const newRoutine = await routineService.postRoutine(routineData);
    res.status(201).json(newRoutine);
  } catch (error) {
    next(error);
  }
};

// PUT /routines/:id - Actualizar rutina completa
export const updateRoutineController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const routineData = req.body;

    if (!routineData.exercises || routineData.exercises.length === 0) {
      return res.status(400).json({
        message: "La rutina debe tener al menos un ejercicio",
      });
    }

    const updatedRoutine = await routineService.updateRoutine(id, routineData);
    res.status(200).json(updatedRoutine);
  } catch (error) {
    next(error);
  }
};

// DELETE /routines/:id - Eliminar rutina
export const deleteRoutineController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await routineService.deleteRoutine(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
