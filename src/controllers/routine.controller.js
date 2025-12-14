import * as routineService from "../services/routine.service.js";

export const getAllRoutinesController = async (req, res, next) => {
  try {
    const userId = req.query.userId || req.user?.id;
    const routines = await routineService.getAllRoutines(userId);
    res.status(200).json(routines);
  } catch (error) {
    next(error);
  }
};

export const getRoutineByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const routine = await routineService.getRoutineById(id);
    res.status(200).json(routine);
  } catch (error) {
    next(error);
  }
};

export const postRoutineController = async (req, res, next) => {
  try {
    const userId = req.query.userId || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Usuario no autenticado",
      });
    }

    const routineData = {
      ...req.body,
      created_by: userId,
    };

    const newRoutine = await routineService.postRoutine(routineData);
    res.status(201).json(newRoutine);
  } catch (error) {
    next(error);
  }
};

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

export const deleteRoutineController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await routineService.deleteRoutine(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export async function assignRoutineController(req, res, next) {
  try {
    const trainerId = req.user.id;
    const { id } = req.params;
    const { athlete_ids } = req.body;

    if (!Array.isArray(athlete_ids)) {
      return res.status(400).json({
        message: "athlete_ids debe ser un array",
      });
    }

    const result = await routineService.assignRoutineToAthletes(
      id,
      athlete_ids,
      trainerId
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getAssignedRoutinesController(req, res, next) {
  try {
    const athleteId = req.user.id;
    const routines = await routineService.getAssignedRoutines(athleteId);

    res.status(200).json(routines);
  } catch (error) {
    next(error);
  }
}
