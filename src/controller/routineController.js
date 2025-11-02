// routineController.js
import * as routineService from "../services/routineService.js";

// GET /routines

export const getAllRoutinesController = async (req, res, next) => {
  try {
    const users = await routineService.getAllRoutines();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// GET /routines/:id
export const getRoutineByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await routineService.getRoutineById(id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const postRoutineController = async (req, res, next) => {
  try {
    const routineData = req.body;

    console.log("REQ.BODY:", req.body);

    const tiposValidos = [
      "fuerza",
      "resistencia",
      "mixto",
      "hipertrofia",
      "movilidad",
      "cardio",
    ];

    if (!routineData.name || !routineData.type || !routineData.created_by) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    if (!tiposValidos.includes(routineData.type)) {
      return res.status(400).json({
        message: `Tipo inválido. Debe ser uno de: ${tiposValidos.join(", ")}`,
      });
    }

    const newRoutine = await routineService.postRoutine(routineData);

    res.status(201).json(newRoutine);
  } catch (error) {
    next(error);
  }
};
