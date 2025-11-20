import express from "express";
import {
  deleteRoutineController,
  getAllRoutinesController,
  getRoutineByIdController,
  postRoutineController,
  updateRoutineController,
} from "../controllers/routine.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyToken);

// GET / - Listar todas
router.get("/", getAllRoutinesController);

// GET /routines/:id - Detalle completo
router.get("/:id", getRoutineByIdController);

// POST /routines - Crear rutina completa
router.post("/", postRoutineController);

// PUT /routines/:id - Actualizar rutina completa
router.put("/:id", updateRoutineController);

// DELETE /routines/:id - Eliminar rutina
router.delete("/:id", deleteRoutineController);

export default router;
