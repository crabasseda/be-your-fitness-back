import mongoose from "mongoose";
import { User } from "../models/user.model.js";
export async function getAthletesByTrainerId(trainerId) {
  if (!mongoose.Types.ObjectId.isValid(trainerId)) {
    throw new Error("ID de entrenador no válido");
  }

  const athletes = await User.find({
    trainer_id: trainerId,
    role: "athlete",
  })
    .select("-password")
    .lean();
  return athletes.map((athlete) => ({
    ...athlete,
    id: athlete._id.toString(),
    _id: undefined,
  }));
}

export async function getAthleteById(athleteId) {
  if (!mongoose.Types.ObjectId.isValid(athleteId)) {
    throw new Error("ID de atleta no válido");
  }
  const athlete = await User.findById(athleteId).select("-password").lean();

  if (!athlete) {
    throw new Error("Atleta no encontrado");
  }

  return {
    ...athlete,
    id: athlete._id.toString(),
    _id: undefined,
  };
}
