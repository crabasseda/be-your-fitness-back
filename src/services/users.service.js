import mongoose from "mongoose";
import { User } from "../models/user.model.js";
export async function getUsersByTrainerId(trainerId) {
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

export async function getUserById(userId) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("ID de user no válido");
  }
  const user = await User.findById(userId).select("-password").lean();

  if (!user) {
    throw new Error("Atleta no encontrado");
  }

  return {
    ...user,
    id: user._id.toString(),
    _id: undefined,
  };
}
