import mongoose from "mongoose";
import { Feedback } from "../models/feedback.model.js";

export async function createFeedback(trainerId, athleteId, message) {
  if (!mongoose.Types.ObjectId.isValid(athleteId)) {
    throw new Error("ID de atleta no válido");
  }

  const feedback = new Feedback({
    trainer_id: trainerId,
    athlete_id: athleteId,
    message: message,
  });

  await feedback.save();
  return feedback;
}

export async function getLastFeedbackForAthlete(athleteId) {
  const feedback = await Feedback.findOne({ athlete_id: athleteId })
    .sort({ createdAt: -1 })
    .populate("trainer_id", "name surname")
    .lean();

  return feedback;
}

export async function getFeedbackHistory(athleteId, limit = 10) {
  const feedbacks = await Feedback.find({ athlete_id: athleteId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("trainer_id", "name surname")
    .lean();

  return feedbacks;
}
