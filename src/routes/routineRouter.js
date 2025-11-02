import express from "express";
const router = express.Router();

import {
  getAllRoutinesController,
  getRoutineByIdController,
  postRoutineController,
} from "../controller/routineController.js";

// GET /routines
router.get("/", getAllRoutinesController);

// GET /routines/:id
router.get("/:id", getRoutineByIdController);

// POST /routines
router.post("/", postRoutineController);

export default router;
