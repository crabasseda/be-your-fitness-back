import express from "express";
import {
  assignRoutineController,
  deleteRoutineController,
  getAllRoutinesController,
  getAssignedRoutinesController,
  getRoutineByIdController,
  postRoutineController,
  updateRoutineController,
} from "../controllers/routine.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyToken);

// GET  /routines/assigned - Ver rutinas asignadas (atleta)
router.get("/assigned", getAssignedRoutinesController);

// GET / - Listar todas
router.get("/", getAllRoutinesController);

// GET /routines/:id - Detalle completo
router.get("/:id", getRoutineByIdController);

// POST /routines - Crear rutina completa
router.post("/", postRoutineController);

// PUT /routines/:id - Actualizar rutina completa
router.put("/:id", updateRoutineController);

// PUT /routines/:id/assign - Asignar rutina
router.put("/:id/assign", assignRoutineController);

// DELETE /routines/:id - Eliminar rutina
router.delete("/:id", deleteRoutineController);

export default router;
