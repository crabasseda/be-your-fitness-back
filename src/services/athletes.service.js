import mongoose from "mongoose";
import { User } from "../models/user.model.js";
export async function getAthletesByTrainerId(trainerId) {
  if (!mongoose.Types.ObjectId.isValid(trainerId)) {
    throw new Error("ID de entrenador no válido");
  }

  const athletes = await User.find({
    trainer_id: trainerId,
    role: "athlete",
  }).select("-password");

  return athletes;
}
