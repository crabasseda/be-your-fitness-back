import { Router } from "express";
import {
  getAthleteByIdController,
  getMyAthletes,
} from "../controllers/athletes.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyToken);

router.get("/", getMyAthletes);

router.get("/:id", getAthleteByIdController);

export default router;
