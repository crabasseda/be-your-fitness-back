import { Router } from "express";
import { getMyAthletes } from "../controllers/athletes.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyToken);

router.get("/", getMyAthletes);

export default router;
