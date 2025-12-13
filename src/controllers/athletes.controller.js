import { getAthletesByTrainerId } from "../services/athletes.service.js";

export async function getMyAthletes(req, res) {
  try {
    const trainerId = req.user.id;
    const athletes = await getAthletesByTrainerId(trainerId);

    res.status(200).json(athletes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener atletas", error: error.message });
  }
}
