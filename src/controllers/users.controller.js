import { getUserById, getUsersByTrainerId } from "../services/users.service.js";

export async function getAthletes(req, res, next) {
  try {
    const trainerId = req.user.id;
    const athletes = await getUsersByTrainerId(trainerId);

    res.status(200).json(athletes);
  } catch (error) {
    next(error);
  }
}

export async function getUserByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    res.status(200).json(user);
  } catch (error) {
    if (
      error.message.includes("no válido") ||
      error.message.includes("no encontrado")
    ) {
      return res.status(404).json({ message: error.message });
    }

    next(error);
  }
}
