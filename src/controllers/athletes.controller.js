import {
  getAthleteById,
  getAthletesByTrainerId,
} from "../services/athletes.service.js";

export async function getMyAthletes(req, res, next) {
  try {
    const trainerId = req.user.id;
    const athletes = await getAthletesByTrainerId(trainerId);

    res.status(200).json(athletes);
  } catch (error) {
    next(error);
  }
}

export async function getAthleteByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const athlete = await getAthleteById(id);

    res.status(200).json(athlete);
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
