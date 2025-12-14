import { Router } from "express";
import {
  getAthletes,
  getUserByIdController,
} from "../controllers/users.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyToken);

router.get("/", getAthletes);

router.get("/:id", getUserByIdController);

export default router;
