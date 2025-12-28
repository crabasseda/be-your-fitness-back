import * as feedbackService from "../services/feedback.service.js";

export async function createFeedbackController(req, res) {
  try {
    const trainerId = req.user.id;
    const { athlete_id, message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: "El mensaje es requerido" });
    }

    const feedback = await feedbackService.createFeedback(
      trainerId,
      athlete_id,
      message
    );

    res.status(201).json(feedback);
  } catch (error) {
    console.error("Error al crear feedback:", error.message);
    res.status(500).json({ message: "Error al crear feedback" });
  }
}

export async function getLastFeedbackController(req, res) {
  try {
    const athleteId = req.user.id; // El atleta autenticado
    const feedback = await feedbackService.getLastFeedbackForAthlete(athleteId);

    res.status(200).json(feedback || null);
  } catch (error) {
    console.error("Error al obtener feedback:", error.message);
    res.status(500).json({ message: "Error al obtener feedback" });
  }
}

export async function getFeedbackHistoryController(req, res) {
  try {
    const athleteId = req.user.id;
    const limit = parseInt(req.query.limit) || 10;

    const feedbacks = await feedbackService.getFeedbackHistory(
      athleteId,
      limit
    );

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error al obtener historial:", error.message);
    res.status(500).json({ message: "Error al obtener historial" });
  }
}
