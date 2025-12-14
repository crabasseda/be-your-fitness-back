import { Router } from "express";
import {
  createFeedbackController,
  getFeedbackHistoryController,
  getLastFeedbackController,
} from "../controllers/feedback.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyToken);

router.post("/", createFeedbackController);

router.get("/last", getLastFeedbackController);

router.get("/history", getFeedbackHistoryController);

export default router;
